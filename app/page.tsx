import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { customerName, customerTin, items, vatEnabled, paymentMethod } = body;

  if (!customerName || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Invalid sale payload' }, { status: 400 });
  }

  const productIds = items.map((item: any) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const productMap = new Map(products.map((product) => [product.id, product]));
  let subtotal = 0;

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
    }

    subtotal += item.quantity * product.unitPrice;
  }

  const vatAmount = vatEnabled ? subtotal * 0.15 : 0;
  const totalAmount = subtotal + vatAmount;

  const sale = await prisma.sale.create({
    data: {
      customerName,
      customerTin: customerTin || null,
      subtotal,
      vatAmount,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash',
      status: 'Paid',
      items: {
        create: items.map((item: any) => {
          const product = productMap.get(item.productId)!;
          const lineTotal = item.quantity * product.unitPrice;

          return {
            productId: product.id,
            quantity: Number(item.quantity),
            unitPrice: product.unitPrice,
            subtotal: lineTotal
          };
        })
      }
    }
  });

  for (const item of items) {
    const product = productMap.get(item.productId)!;
    await prisma.product.update({
      where: { id: product.id },
      data: {
        stock: {
          decrement: Number(item.quantity)
        }
      }
    });
  }

  return NextResponse.json({ sale }, { status: 201 });
}
