import sharp from 'sharp'

import type { Payload } from 'payload'

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function clientLogoSvg(wordmark: string, color: string): string {
  return `<svg width="280" height="80" xmlns="http://www.w3.org/2000/svg">
  <text x="8" y="52" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${escapeXml(color)}">${escapeXml(wordmark)}</text>
</svg>`
}

export function avatarSvg(initials: string, color: string): string {
  return `<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <circle cx="64" cy="64" r="64" fill="${escapeXml(color)}"/>
  <text x="64" y="74" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="600" fill="#ffffff" text-anchor="middle">${escapeXml(initials)}</text>
</svg>`
}

async function svgToPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer()
}

export async function ensureSeedImage(
  payload: Payload,
  opts: {
    filename: string
    alt: string
    svg: string
    user?: { id: string | number; roles?: ('admin' | 'editor')[] }
  },
): Promise<string | number> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: opts.filename } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) return existing.docs[0].id

  const png = await svgToPng(opts.svg)
  const context = opts.user ? { user: opts.user } : {}

  const doc = await payload.create({
    collection: 'media',
    data: { alt: opts.alt, kind: 'image' },
    file: {
      data: png,
      mimetype: 'image/png',
      name: opts.filename,
      size: png.length,
    },
    overrideAccess: true,
    ...context,
  })
  return doc.id
}
