import type { Field } from 'payload'

import { CTA_KEY_OPTIONS } from '../constants'

export function ctaKeyField(name: string, required = false): Field {
  return {
    name,
    type: 'select',
    required,
    options: [...CTA_KEY_OPTIONS],
    admin: {
      description: 'Must resolve against cta-config.primaryCtas keys (ch. 5.2.1, 5.11).',
    },
  }
}
