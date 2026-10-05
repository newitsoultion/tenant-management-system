import { inventoryItems } from '@/lib/mock-data';

export default function InventoryPage() {
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
          <span className="tag neutral">{inventoryItems.length} products</span>
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
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>
                  <span className={item.stock < 10 ? 'danger-text' : ''}>{item.stock}</span>
                </td>
                <td>{item.price.toLocaleString()} Tsh</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
