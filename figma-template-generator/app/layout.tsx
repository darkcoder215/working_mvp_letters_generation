import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Figma Template Generator - AI-Powered Fillable Templates',
  description: 'Transform Figma designs into pixel-perfect fillable templates with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
