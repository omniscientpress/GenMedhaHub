import type { GlobalBeforeValidateHook } from 'payload'

/** Reject duplicate `from` paths and simple redirect chains (ch. 5.8.1). */
export const validateRedirectsHook: GlobalBeforeValidateHook = ({ data }) => {
  const redirects = (data?.redirects as { from?: string; to?: string }[]) ?? []
  const fromSet = new Set<string>()

  for (const row of redirects) {
    const from = row.from?.trim()
    const to = row.to?.trim()
    if (!from?.startsWith('/')) {
      throw new Error(`Redirect "from" must start with /: ${from}`)
    }
    if (from.endsWith('/')) {
      throw new Error(`Redirect "from" must not have trailing slash: ${from}`)
    }
    if (fromSet.has(from)) {
      throw new Error(`Duplicate redirect from path: ${from}`)
    }
    fromSet.add(from)

    if (to && fromSet.has(to)) {
      throw new Error(`Redirect chain detected: ${from} → ${to}`)
    }
  }

  return data
}
