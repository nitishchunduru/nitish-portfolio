import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nitish Chunduru | SAP MM Consultant | S4HANA | Materials Management',
  description: 'Professional SAP MM Consultant with 1 year of hands-on experience in SAP S4HANA migration, procurement, inventory management, and P2P cycle processes. Specialized in Materials Management and enterprise resource planning.',
  keywords: ['SAP MM', 'SAP S4HANA', 'Materials Management', 'Procurement', 'P2P Cycle', 'SAP Consultant', 'Inventory Management'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Nitish Chunduru | SAP MM Consultant',
    description: 'SAP MM Consultant specializing in S4HANA migration, procurement, and inventory management',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white scroll-smooth">
      <body className="font-sans antialiased bg-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
