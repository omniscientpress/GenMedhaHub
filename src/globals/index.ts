import type { GlobalConfig } from 'payload'

import { isAdmin } from '../payload/access'
import { validateRedirectsHook } from '../payload/hooks/globalHooks'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      required: true,
      maxLength: 40,
      admin: { description: 'Used in title templates and Organization schema.' },
    },
    { name: 'tagline', type: 'text', required: true, maxLength: 90 },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'logoDark', type: 'upload', relationTo: 'media' },
    {
      name: 'socialLinks',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'X', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'foundingYear', type: 'number', min: 2000 },
  ],
}

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 9,
      admin: { description: 'Order matches ch. 3.3 exactly.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text' },
        {
          name: 'dropdown',
          type: 'array',
          maxRows: 8,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 4,
      admin: { description: 'Services, Platforms, Migrate, Company (3.3.1).' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'showTrustBadges',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'mobileCtaLabel',
      type: 'text',
      required: true,
      maxLength: 24,
      defaultValue: 'Book a call',
    },
    {
      name: 'marketsStrip',
      type: 'text',
      defaultValue: 'Serving India · USA · UAE & GCC',
      admin: { description: 'Footer markets strip exact string (addendum D9).' },
    },
    {
      name: 'marketsHref',
      type: 'text',
      defaultValue: '/markets',
    },
  ],
}

export const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'titleTemplate',
      type: 'text',
      required: true,
      defaultValue: '%s · GenMedha Hub',
    },
    { name: 'defaultMetaDescription', type: 'textarea', required: true, maxLength: 160 },
    { name: 'siteName', type: 'text', required: true, defaultValue: 'GenMedha Hub' },
    { name: 'twitterHandle', type: 'text' },
    {
      name: 'robotsPolicy',
      type: 'select',
      required: true,
      defaultValue: 'allow-all',
      options: [
        { label: 'Allow all', value: 'allow-all' },
        { label: 'Custom', value: 'custom' },
      ],
    },
  ],
}

export const Redirects: GlobalConfig = {
  slug: 'redirects',
  label: 'Redirects',
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'redirects',
      type: 'array',
      required: true,
      fields: [
        { name: 'from', type: 'text', required: true },
        { name: 'to', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          defaultValue: '301',
          options: [
            { label: '301', value: '301' },
            { label: '302', value: '302' },
          ],
        },
        { name: 'note', type: 'text' },
      ],
    },
  ],
  hooks: {
    beforeValidate: [validateRedirectsHook],
  },
}

export const CtaConfig: GlobalConfig = {
  slug: 'cta-config',
  label: 'CTA Config',
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      name: 'primaryCtas',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Book a call', value: 'book-call' },
            { label: 'Get audit', value: 'get-audit' },
            { label: 'Scope app', value: 'scope-app' },
            { label: 'Download checklist', value: 'download-checklist' },
            { label: 'Subscribe', value: 'subscribe' },
            { label: 'View work', value: 'view-work' },
          ],
        },
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'bookingUrl', type: 'text', required: true },
    {
      name: 'bookingEventTypes',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Discovery 30', value: 'discovery-30' },
            { label: 'Audit scoping', value: 'audit-scoping' },
          ],
        },
        { name: 'calSlug', type: 'text', required: true },
        { name: 'durationMin', type: 'number', required: true },
      ],
    },
  ],
}
