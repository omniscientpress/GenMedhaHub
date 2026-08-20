import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
const isStagingOrPreview = serverUrl.includes('staging') || serverUrl.includes('preview-')

/** CMS-backed shell pages need runtime Payload — skip static prerender at build (no DB/secret in CI). */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(serverUrl),
  title: {
    default: 'GenMedha Hub',
    template: '%s · GenMedha Hub',
  },
  description:
    'Commerce engineering, headless storefronts, and platform migration — Medusa, Next.js, and Payload. A brand of GenMedha Solutions Private Limited.',
  ...(isStagingOrPreview ? { robots: { index: false, follow: false } } : {}),
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
