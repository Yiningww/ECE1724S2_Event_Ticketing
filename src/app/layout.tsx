//已改

// app/layout.tsx
import './globals.css'; // 你可以放置Tailwind或其他css
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Event Platform',
  description: 'Minimal Next.js + Prisma Setup',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

