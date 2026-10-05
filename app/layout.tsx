import { prisma } from '@/lib/prisma';

export default async function InventoryPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Inventory</h1>
        </div>
      </header>

      <section className="card">
        <div className="section-header">
          <h2>Stock overview</h2>
          <span className="tag neutral">{products.length} products</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>
                  <span className={item.stock < item.lowStockThreshold ? 'danger-text' : ''}>{item.stock}</span>
                </td>
                <td>{item.unitPrice.toLocaleString()} Tsh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
