import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const tenantSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  tin: z.string().optional(),
  unit: z.string().min(1),
  monthlyRent: z.coerce.number(),
  rentDueDate: z.string(),
  status: z.enum(['Active', 'Pending', 'Inactive'])
});

export async function GET() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(tenants);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = tenantSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const tenant = await prisma.tenant.create({
    data: {
      ...parsed.data,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      tin: parsed.data.tin || null
    }
  });

  return NextResponse.json(tenant, { status: 201 });
}
