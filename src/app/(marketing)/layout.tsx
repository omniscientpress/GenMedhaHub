import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const isStagingOrPreview = serverUrl.includes('staging') || serverUrl.includes('preview-')

export const metadata: Metadata = {
  metadataBase: new URL(serverUrl),
  title: 'GenMedha Hub',
  description: 'GenMedha Hub — digital agency. Site under construction.',
  ...(isStagingOrPreview ? { robots: { index: false, follow: false } } : {}),
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
