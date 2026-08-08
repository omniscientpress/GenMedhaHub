import Link from 'next/link'

import type { NavLink } from '@/config/navigation'

export interface BreadcrumbSegment {
  label: string
  href: string
}

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[]
}

/** Renders breadcrumb trail + BreadcrumbList JSON-LD (ch. 4.2). */
export function Breadcrumbs({ segments }: BreadcrumbsProps) {
  if (segments.length <= 1) {
    return null
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: segment.label,
      item: segment.href,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-muted/30">
      <ol className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center gap-1 px-4 py-3 text-sm sm:px-6 lg:px-8">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          return (
            <li key={segment.href} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="text-muted-foreground hover:text-foreground min-target inline-flex items-center underline-offset-2 hover:underline"
                >
                  {segment.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}

export function segmentsFromPath(pathname: string, labelMap?: Record<string, string>): BreadcrumbSegment[] {
  const parts = pathname.split('/').filter(Boolean)
  const segments: BreadcrumbSegment[] = [{ label: 'Home', href: '/' }]

  let path = ''
  for (const part of parts) {
    path += `/${part}`
    const label =
      labelMap?.[part] ??
      part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace('Uae Gcc', 'UAE & GCC')
        .replace('Seo Geo', 'SEO & GEO')
    segments.push({ label, href: path })
  }

  return segments
}

export type { NavLink }
