import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

interface CmsRichTextProps {
  content: Parameters<typeof LexicalRichText>[0]['data']
  className?: string
}

/** Renders Payload Lexical rich text with site prose styles. */
export function CmsRichText({ content, className }: CmsRichTextProps) {
  return (
    <LexicalRichText
      data={content}
      className={cn(
        'cms-rich-text text-foreground [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:underline',
        '[&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight',
        '[&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold',
        '[&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
        '[&_p]:my-4 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
        '[&_strong]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
        className,
      )}
    />
  )
}
