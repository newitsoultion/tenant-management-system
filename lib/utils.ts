export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
}

export function calculateDaysUntil(dateValue: string) {
  const today = new Date();
  const due = new Date(dateValue);

  const diffMs = due.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function buildRentAlerts<T extends { name: string; unit: string; monthlyRent: number; rentDueDate: string; status: string }>(
  tenants: T[]
) {
  return tenants
    .filter((tenant) => tenant.status === 'Active')
    .map((tenant) => ({
      id: tenant.name,
      tenant: tenant.name,
      unit: tenant.unit,
      amount: tenant.monthlyRent,
      daysLeft: calculateDaysUntil(tenant.rentDueDate)
    }))
    .filter((alert) => alert.daysLeft <= 7);
}
