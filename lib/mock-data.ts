export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
};

export type Tenant = {
  id: number;
  name: string;
  tin: string;
  unit: string;
  rentDue: string;
  status: 'Active' | 'Pending' | 'Inactive';
};

export type RentAlert = {
  id: number;
  tenant: string;
  unit: string;
  amount: string;
  daysLeft: number;
};

export type Sale = {
  id: number;
  customer: string;
  reference: string;
  amount: string;
  status: 'Paid' | 'Pending';
};

export type InventoryItem = {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
};

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Occupied Units', value: '84%', note: '+4% this month' },
  { label: 'Rent Collected', value: 'Tsh 2.4M', note: '86% collection rate' },
  { label: 'POS Sales', value: 'Tsh 1.8M', note: '12% month-on-month' },
  { label: 'Low Stock Items', value: '7 Items', note: 'Review replenishment' }
];

export const rentAlerts: RentAlert[] = [
  { id: 1, tenant: 'Amina Yusuf', unit: 'A-102', amount: 'Tsh 420,000', daysLeft: 2 },
  { id: 2, tenant: 'Juma Kivuva', unit: 'B-205', amount: 'Tsh 510,000', daysLeft: 4 },
  { id: 3, tenant: 'Njeri Wanjiku', unit: 'C-118', amount: 'Tsh 375,000', daysLeft: 6 }
];

export const tenants: Tenant[] = [
  { id: 1, name: 'Amina Yusuf', tin: 'TIN-2024-9814', unit: 'A-102', rentDue: '05 Oct 2026', status: 'Active' },
  { id: 2, name: 'Juma Kivuva', tin: 'TIN-2024-4312', unit: 'B-205', rentDue: '07 Oct 2026', status: 'Pending' },
  { id: 3, name: 'Njeri Wanjiku', tin: 'TIN-2024-1047', unit: 'C-118', rentDue: '09 Oct 2026', status: 'Active' },
  { id: 4, name: 'Daniel Mwakasege', tin: 'TIN-2024-5526', unit: 'D-010', rentDue: '12 Oct 2026', status: 'Inactive' }
];

export const recentSales: Sale[] = [
  { id: 1, customer: 'John Msuya', reference: 'INV-1042', amount: 'Tsh 86,500', status: 'Paid' },
  { id: 2, customer: 'Grace Kilonzo', reference: 'INV-1043', amount: 'Tsh 45,000', status: 'Paid' },
  { id: 3, customer: 'Ndolo Kassim', reference: 'INV-1044', amount: 'Tsh 64,200', status: 'Pending' }
];

export const inventoryItems: InventoryItem[] = [
  { id: 1, name: 'Cement Bag', sku: 'CM-100', category: 'Building', stock: 18, price: 42000 },
  { id: 2, name: 'Rice 5kg', sku: 'RC-050', category: 'Food', stock: 54, price: 16500 },
  { id: 3, name: 'Soap Pack', sku: 'SP-240', category: 'Household', stock: 8, price: 8500 },
  { id: 4, name: 'Water Bottle', sku: 'WB-1000', category: 'Beverage', stock: 30, price: 2500 }
];
