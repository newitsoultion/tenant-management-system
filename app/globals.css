import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tenant Management System',
  description: 'Tenant management, POS, and inventory reporting.'
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/tenants', label: 'Tenants' },
  { href: '/pos', label: 'POS' },
  { href: '/inventory', label: 'Inventory' }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <div className="brand">
              <span className="logo">T</span>
              <div>
                <strong>TenantFlow</strong>
                <small>Property + Retail</small>
              </div>
            </div>

            <nav className="nav">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
