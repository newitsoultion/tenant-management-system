import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { calculateDaysUntil } from '@/lib/utils';

export default async function DashboardPage() {
  const tenants = await prisma.tenant.findMany({ orderBy: { createdAt: 'desc' } });
  const sales = await prisma.sale.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
  const totalRentCollected = await prisma.payment.aggregate({
    _sum: { amount: true }
  });

  const reminders = tenants
    .filter((tenant) => tenant.status === 'Active')
    .map((tenant) => ({
      id: tenant.id,
      tenant: tenant.name,
      unit: tenant.unit,
      amount: tenant.monthlyRent,
      daysLeft: calculateDaysUntil(tenant.rentDueDate)
    }))
    .filter((alert) => alert.daysLeft <= 7)
    .slice(0, 5);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
        </div>
        <Link href="/pos" className="primary-button">New POS Sale</Link>
      </header>

      <section className="grid metrics-grid">
        <div className="card metric-card">
          <span>Occupied Units</span>
          <strong>{tenants.filter((tenant) => tenant.status === 'Active').length}</strong>
          <small>Active tenants</small>
        </div>
        <div className="card metric-card">
          <span>Rent Collected</span>
          <strong>Tsh {Number(totalRentCollected._sum.amount ?? 0).toLocaleString()}</strong>
          <small>Collected this cycle</small>
        </div>
        <div className="card metric-card">
          <span>POS Sales</span>
          <strong>Tsh {totalRevenue.toLocaleString()}</strong>
          <small>Recent transaction value</small>
        </div>
        <div className="card metric-card">
          <span>Low Stock</span>
          <strong>{(await prisma.product.count({ where: { stock: { lte: 10 } } }))}</strong>
          <small>Items below reorder level</small>
        </div>
      </section>

      <section className="two-column-grid">
        <div className="card">
          <div className="section-header">
            <h2>Rent due reminders</h2>
            <span className="tag warning">{reminders.length} alerts</span>
          </div>

          <div className="stack-list">
            {reminders.length === 0 ? (
              <p>No rent reminders for the next 7 days.</p>
            ) : (
              reminders.map((alert) => (
                <div key={alert.id} className="list-row warn-row">
                  <div>
                    <strong>{alert.tenant}</strong>
                    <small>{alert.unit}</small>
                  </div>
                  <div className="right-align">
                    <span>{alert.daysLeft} days left</span>
                    <small>Tsh {alert.amount.toLocaleString()}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <h2>Tenant summary</h2>
            <span className="tag success">{tenants.length} tenants</span>
          </div>

          <div className="stack-list">
            {tenants.slice(0, 4).map((tenant) => (
              <div key={tenant.id} className="list-row">
                <div>
                  <strong>{tenant.name}</strong>
                  <small>{tenant.unit}</small>
                </div>
                <div className="right-align">
                  <span>{tenant.status}</span>
                  <small>{tenant.rentDueDate}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Recent POS sales</h2>
          <span className="tag neutral">{sales.length} entries</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>TIN</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.customerName}</td>
                <td>{sale.customerTin ?? '—'}</td>
                <td>Tsh {sale.totalAmount.toLocaleString()}</td>
                <td><span className={`status status-${sale.status.toLowerCase()}`}>{sale.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
