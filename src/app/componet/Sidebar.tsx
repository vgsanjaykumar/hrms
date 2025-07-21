'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/projects' },
  { label: 'PayRoll', href: '/payroll' },
  { label: 'Attendance', href: '/attendance' },
  { label: 'My Profile', href: '/my-profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-purple-700 text-white flex flex-col justify-between h-screen p-4">
      {/* Top: Title & Menu */}
      <div>
        <h1 className="text-2xl font-bold mb-8">HRMS</h1>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pl-2 py-1 rounded hover:bg-purple-600 ${
                pathname === item.href ? 'bg-purple-600 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: User avatar & Logout */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm font-bold">
            N
          </div>
        </div>
        <button className="w-full bg-white text-purple-700 font-semibold py-2 rounded hover:bg-purple-100 transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
