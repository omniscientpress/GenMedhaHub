'use client'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CmsRichText } from '@/components/cms/cms-rich-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqPageJsonLd, lexicalPlainText } from '@/lib/cms/schema'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type FaqAccordionBlock = Extract<LayoutBlock, { blockType: 'faqAccordion' }>

export function FaqAccordionBlockRenderer({ block }: BlockRendererProps<FaqAccordionBlock>) {
  const schemaFaqs = block.faqs.map((faq) => ({
    question: faq.question,
    answer: lexicalPlainText(faq.answer),
  }))

  return (
    <Section spacing="default">
      <Container>
        <Stack gap="6" className="max-w-3xl">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Accordion type="single" collapsible>
            {block.faqs.map((faq, index) => (
              <AccordionItem key={faq.id ?? faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <CmsRichText content={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      </Container>
      {block.emitSchema !== false && schemaFaqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(schemaFaqs)) }}
        />
      ) : null}
    </Section>
  )
}
