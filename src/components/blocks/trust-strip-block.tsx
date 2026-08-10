import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import {
  getTrustStripClients,
  getTrustStripOpenSource,
  getTrustStripPartnerBadges,
} from '@/lib/cms/fetch'
import { isPopulatedMedia, mediaUrl } from '@/lib/cms/media'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type TrustStripBlock = Extract<LayoutBlock, { blockType: 'trustStrip' }>

export async function TrustStripBlockRenderer({ block }: BlockRendererProps<TrustStripBlock>) {
  if (block.source === 'clients') {
    const clients = await getTrustStripClients()
    if (!clients.length) return null

    return (
      <Section spacing="sm" className="border-y bg-muted/20">
        <Container>
          <Stack gap="4">
            {block.heading ? (
              <p className="text-muted-foreground text-center text-sm font-semibold tracking-wide uppercase">
                {block.heading}
              </p>
            ) : null}
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {clients.map((client) => {
                const logo = isPopulatedMedia(client.logo) ? client.logo : null
                const src = logo ? mediaUrl(logo) : null
                return (
                  <li key={client.id}>
                    {client.url ? (
                      <Link href={client.url} className="opacity-80 transition-opacity hover:opacity-100">
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={src} alt={client.name} className="h-8 w-auto object-contain" />
                        ) : (
                          <span className="text-sm font-medium">{client.name}</span>
                        )}
                      </Link>
                    ) : src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={client.name} className="h-8 w-auto object-contain opacity-80" />
                    ) : (
                      <span className="text-sm font-medium">{client.name}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </Stack>
        </Container>
      </Section>
    )
  }

  if (block.source === 'partner-badges') {
    const badges = await getTrustStripPartnerBadges()
    if (!badges.length) return null

    return (
      <Section spacing="sm" className="border-y bg-muted/20">
        <Container>
          <Stack gap="4">
            {block.heading ? (
              <p className="text-muted-foreground text-center text-sm font-semibold tracking-wide uppercase">
                {block.heading}
              </p>
            ) : null}
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {badges.map((badge) => (
                <li key={badge.id}>
                  {badge.badgeUrl ? (
                    <Link href={badge.badgeUrl} className="text-primary text-sm underline-offset-2 hover:underline">
                      {badge.name}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium">{badge.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </Stack>
        </Container>
      </Section>
    )
  }

  const projects = await getTrustStripOpenSource()
  if (!projects.length) return null

  return (
    <Section spacing="sm" className="border-y bg-muted/20">
      <Container>
        <Stack gap="4">
          {block.heading ? (
            <p className="text-muted-foreground text-center text-sm font-semibold tracking-wide uppercase">
              {block.heading}
            </p>
          ) : null}
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={project.repoUrl}
                  className="text-foreground text-sm font-medium underline-offset-2 hover:underline"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  )
}
