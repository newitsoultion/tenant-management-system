import { prisma } from '@/lib/prisma';

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Customer records</p>
          <h1>Tenant Management</h1>
        </div>
      </header>

      <section className="card form-card">
        <h2>Add / Update Tenant</h2>
        <div className="grid two-col-form">
          <label>
            Full name
            <input defaultValue="Amina Yusuf" />
          </label>
          <label>
            TIN number
            <input defaultValue="TIN-2024-9814" />
          </label>
          <label>
            Phone number
            <input defaultValue="+255 714 332 234" />
          </label>
          <label>
            Email
            <input defaultValue="amina@example.com" />
          </label>
          <label>
            Unit / room
            <input defaultValue="A-102" />
          </label>
          <label>
            Rent due date
            <input type="date" defaultValue="2026-10-05" />
          </label>
          <label>
            Monthly rent
            <input defaultValue="420000" />
          </label>
          <label>
            Status
            <select defaultValue="Active">
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Tenant list</h2>
          <span className="tag success">{tenants.length} records</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>TIN</th>
              <th>Unit</th>
              <th>Rent Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td>{tenant.name}</td>
                <td>{tenant.tin ?? '—'}</td>
                <td>{tenant.unit}</td>
                <td>{tenant.rentDueDate}</td>
                <td><span className={`status status-${tenant.status.toLowerCase()}`}>{tenant.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
