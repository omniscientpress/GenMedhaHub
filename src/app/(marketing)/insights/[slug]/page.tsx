import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CmsRichText } from '@/components/cms/cms-rich-text'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'
import { getPostBySlug } from '@/lib/cms/fetch'
import { publishedOrNotFound } from '@/lib/cms/layout-route'
import { isPopulated } from '@/lib/cms/relationships'
import { buildPageMetadata } from '@/lib/cms/seo'

export const revalidate = 300

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post not found' }

  return buildPageMetadata({
    title: post.seo?.metaTitle?.trim() || post.title,
    description: post.seo?.metaDescription?.trim() || post.excerpt,
    ogImage: post.seo?.ogImage,
    noindex: post.seo?.noindex,
    path: `/insights/${post.slug}`,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = publishedOrNotFound(await getPostBySlug(slug))
  const author = isPopulated(post.author) ? post.author : null

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Insights', href: '/insights' },
    { label: post.title, href: `/insights/${post.slug}` },
  ]

  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={breadcrumbs} />}>
      <Section spacing="lg" className="border-b">
        <Container>
          <Stack gap="4" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-muted-foreground text-lg">{post.excerpt}</p>
            <p className="text-muted-foreground text-sm">
              {author?.name ?? 'GenMedha Hub'}
              {post.readingTimeMin ? ` · ${post.readingTimeMin} min read` : ''}
            </p>
          </Stack>
        </Container>
      </Section>
      <Section spacing="default">
        <Container>
          <div className="mx-auto max-w-3xl">
            <CmsRichText content={post.body} />
          </div>
        </Container>
      </Section>
    </SiteShell>
  )
}
