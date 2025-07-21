// app/layout.tsx (Next.js 13+ with TypeScript)

import './globals.css';
import Sidebar from './componet/Sidebar';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Dashboard',
  description: 'Employee Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <AuthProvider children={undefined}>
          <Sidebar />
          <main className="bg-gray-100 min-h-screen p-6 w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
