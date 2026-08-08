import type { Metadata } from 'next'

import { DesignCatalog } from '@/components/dev/design-catalog'
import { Breadcrumbs, segmentsFromPath } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'

export const metadata: Metadata = {
  title: 'Design Catalog — GenMedha Hub',
  robots: { index: false, follow: false },
}

const labelMap: Record<string, string> = {
  dev: 'Dev',
  catalog: 'Catalog',
}

export default function DevCatalogPage() {
  const segments = segmentsFromPath('/dev/catalog', labelMap)

  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={segments} />}>
      <DesignCatalog />
    </SiteShell>
  )
}
