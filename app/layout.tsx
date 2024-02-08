import type { Metadata } from 'next';
import './global.scss';

export const metadata: Metadata = {
  title: 'Deployment Queue',
  description: 'Board for managing deployment queue',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
