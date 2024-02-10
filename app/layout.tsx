import type { Metadata } from 'next';
import './global.scss';
import QueueProvider from '@/components/provider/queue/queue.provider';

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
      <body>
        <QueueProvider>{children}</QueueProvider>
      </body>
    </html>
  );
}
