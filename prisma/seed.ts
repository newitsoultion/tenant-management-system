import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.tenant.deleteMany();

  const tenants = await prisma.tenant.createMany({
    data: [
      {
        name: 'Amina Yusuf',
        phone: '+255 714 332 234',
        email: 'amina@example.com',
        tin: 'TIN-2024-9814',
        unit: 'A-102',
        monthlyRent: 420000,
        rentDueDate: '2026-10-12',
        status: 'Active'
      },
      {
        name: 'Juma Kivuva',
        phone: '+255 712 445 910',
        email: 'juma@example.com',
        tin: 'TIN-2024-4312',
        unit: 'B-205',
        monthlyRent: 510000,
        rentDueDate: '2026-10-15',
        status: 'Pending'
      },
      {
        name: 'Njeri Wanjiku',
        phone: '+255 765 220 100',
        email: 'njeri@example.com',
        tin: 'TIN-2024-1047',
        unit: 'C-118',
        monthlyRent: 375000,
        rentDueDate: '2026-10-07',
        status: 'Active'
      }
    ]
  });

  await prisma.product.createMany({
    data: [
      { name: 'Cement Bag', sku: 'CM-100', category: 'Building', unitPrice: 42000, stock: 18, lowStockThreshold: 10 },
      { name: 'Rice 5kg', sku: 'RC-050', category: 'Food', unitPrice: 16500, stock: 54, lowStockThreshold: 15 },
      { name: 'Soap Pack', sku: 'SP-240', category: 'Household', unitPrice: 8500, stock: 8, lowStockThreshold: 10 },
      { name: 'Water Bottle', sku: 'WB-1000', category: 'Beverage', unitPrice: 2500, stock: 30, lowStockThreshold: 20 }
    ]
  });

  const productList = await prisma.product.findMany();

  await prisma.sale.create({
    data: {
      customerName: 'John Msuya',
      customerTin: 'TIN-3291-009',
      subtotal: 164000,
      vatAmount: 24600,
      totalAmount: 188600,
      paymentMethod: 'Cash',
      status: 'Paid',
      items: {
        create: [
          {
            productId: productList[0].id,
            quantity: 2,
            unitPrice: 42000,
            subtotal: 84000
          },
          {
            productId: productList[1].id,
            quantity: 1,
            unitPrice: 16500,
            subtotal: 16500
          },
          {
            productId: productList[3].id,
            quantity: 4,
            unitPrice: 2500,
            subtotal: 10000
          }
        ]
      }
    }
  });

  const amina = await prisma.tenant.findFirst({ where: { name: 'Amina Yusuf' } });
  const njeri = await prisma.tenant.findFirst({ where: { name: 'Njeri Wanjiku' } });

  if (amina && njeri) {
    await prisma.payment.createMany({
      data: [
        {
          tenantId: amina.id,
          amount: 420000,
          paymentDate: new Date('2026-10-05T09:00:00Z'),
          method: 'Cash',
          status: 'Paid',
          reference: 'RNT-1001'
        },
        {
          tenantId: njeri.id,
          amount: 375000,
          paymentDate: new Date('2026-10-04T09:15:00Z'),
          method: 'Bank',
          status: 'Paid',
          reference: 'RNT-1002'
        }
      ]
    });
  }

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
