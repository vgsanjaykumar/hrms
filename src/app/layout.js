import './globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Login Demo',
  description: 'Login Signup Flow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
