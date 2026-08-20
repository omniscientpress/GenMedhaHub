import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { PATH_REDIRECTS } from '@/config/redirects'

/** Permanent domain migration: genmedhahub.com → genmedha.in (301, ch. 3.4.1 / 5.8.1). */
const LEGACY_HOSTS = new Set(['genmedhahub.com', 'www.genmedhahub.com'])
const CANONICAL_HOST = 'genmedha.in'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() ?? ''

  if (LEGACY_HOSTS.has(host)) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = CANONICAL_HOST
    // NextURL's `.host` setter doesn't reliably clear a port inherited from the
    // internal request (e.g. behind Traefik on port 3000) — clear it explicitly
    // so the redirect target is https://genmedha.in, not https://genmedha.in:3000.
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'
  const destination = PATH_REDIRECTS[pathname]
  if (destination) {
    const url = request.nextUrl.clone()
    url.pathname = destination
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
