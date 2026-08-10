/** Extract plain text from Lexical rich text for FAQPage JSON-LD. */
export function lexicalPlainText(content: unknown): string {
  const parts: string[] = []

  function walk(nodes: unknown) {
    if (!Array.isArray(nodes)) return
    for (const node of nodes) {
      if (typeof node !== 'object' || node === null) continue
      if ('text' in node && typeof node.text === 'string') parts.push(node.text)
      if ('children' in node) walk(node.children)
    }
  }

  if (typeof content === 'object' && content !== null && 'root' in content) {
    const root = (content as { root?: { children?: unknown } }).root
    walk(root?.children)
  }

  return parts.join(' ').trim()
}

export function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
