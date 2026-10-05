import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const products = await prisma.product.findMany();

  const totalRentCollected = await prisma.payment.aggregate({
    _sum: { amount: true }
  });

  const recentSales = await prisma.sale.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({
    tenants,
    products,
    rentCollected: totalRentCollected._sum.amount ?? 0,
    recentSales
  });
}
