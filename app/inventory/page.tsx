'use client';

import { useMemo, useState } from 'react';
import { prisma } from '@/lib/prisma';

const initialProducts = [
  { id: 'cm-1', name: 'Cement Bag', price: 42000, stock: 18 },
  { id: 'rc-1', name: 'Rice 5kg', price: 16500, stock: 54 },
  { id: 'sp-1', name: 'Soap Pack', price: 8500, stock: 32 },
  { id: 'wb-1', name: 'Water Bottle', price: 2500, stock: 80 }
];

export default function PosPage() {
  const [customerName, setCustomerName] = useState('John Msuya');
  const [tinNumber, setTinNumber] = useState('TIN-3291-009');
  const [vatEnabled, setVatEnabled] = useState(true);
  const [cart, setCart] = useState<{ id: string; name: string; quantity: number; price: number }[]>([
    { id: 'cm-1', name: 'Cement Bag', quantity: 2, price: 42000 }
  ]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const vatAmount = vatEnabled ? subtotal * 0.15 : 0;
  const total = subtotal + vatAmount;

  const addProduct = (product: (typeof initialProducts)[number]) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { id: product.id, name: product.name, quantity: 1, price: product.price }];
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const completeSale = async () => {
    const payload = {
      customerName,
      customerTin: tinNumber,
      vatEnabled,
      paymentMethod: 'Cash',
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    await fetch('/api/pos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  };

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Sales counter</p>
          <h1>POS Module</h1>
        </div>
      </header>

      <section className="two-column-grid pos-layout">
        <div className="card">
          <h2>Customer details</h2>
          <div className="grid two-col-form">
            <label>
              Customer name
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </label>
            <label>
              TIN number
              <input value={tinNumber} onChange={(e) => setTinNumber(e.target.value)} />
            </label>
          </div>

          <div className="section-header margin-top">
            <h2>Products</h2>
            <span className="tag neutral">{initialProducts.length} items</span>
          </div>

          <div className="product-list">
            {initialProducts.map((product) => (
              <button key={product.id} type="button" className="product-item" onClick={() => addProduct(product)}>
                <div>
                  <strong>{product.name}</strong>
                  <small>{product.stock} in stock</small>
                </div>
                <span>{product.price.toLocaleString()} Tsh</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Current sale</h2>

          <div className="receipt-items">
            {cart.map((item) => (
              <div key={item.id} className="receipt-row">
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.price.toLocaleString()} each</small>
                </div>
                <div className="receipt-controls">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="vat-toggle">
            <label>
              <input type="checkbox" checked={vatEnabled} onChange={() => setVatEnabled((val) => !val)} />
              Apply 15% VAT
            </label>
          </div>

          <div className="totals-box">
            <div>
              <span>Subtotal</span>
              <strong>{subtotal.toLocaleString()} Tsh</strong>
            </div>
            <div>
              <span>VAT (15%)</span>
              <strong>{vatAmount.toLocaleString()} Tsh</strong>
            </div>
            <div className="grand-total">
              <span>Total</span>
              <strong>{total.toLocaleString()} Tsh</strong>
            </div>
          </div>

          <button type="button" className="primary-button full-width" onClick={completeSale}>
            Complete Sale
          </button>
        </div>
      </section>
    </>
  );
}
