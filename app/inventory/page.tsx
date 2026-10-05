import Link from 'next/link';
import { dashboardMetrics, rentAlerts, recentSales, tenants } from '@/lib/mock-data';

export default function DashboardPage() {
  const totalRentCollected = 2400000;

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h1>Dashboard</h1>
        </div>
        <Link href="/pos" className="primary-button">
          New POS Sale
        </Link>
      </header>

      <section className="grid metrics-grid">
        {dashboardMetrics.map((metric) => (
          <div key={metric.label} className="card metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.note}</small>
          </div>
        ))}
      </section>

      <section className="two-column-grid">
        <div className="card">
          <div className="section-header">
            <h2>Rent due reminders</h2>
            <span className="tag warning">{rentAlerts.length} alerts</span>
          </div>

          <div className="stack-list">
            {rentAlerts.map((alert) => (
              <div key={alert.id} className="list-row warn-row">
                <div>
                  <strong>{alert.tenant}</strong>
                  <small>{alert.unit}</small>
                </div>
                <div className="right-align">
                  <span>{alert.daysLeft} days left</span>
                  <small>{alert.amount}</small>
                </div>
              </div>
            ))}
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
                  <small>{tenant.rentDue}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Recent POS sales</h2>
          <span className="tag neutral">{recentSales.length} entries</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.customer}</td>
                <td>{sale.reference}</td>
                <td>{sale.amount}</td>
                <td>
                  <span className={`status status-${sale.status.toLowerCase()}`}>{sale.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="summary-banner">
        <strong>Total rent collected this cycle:</strong>
        <span>Tsh {totalRentCollected.toLocaleString()}</span>
      </div>
    </>
  );
}
