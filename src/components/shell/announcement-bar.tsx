'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

import { announcementConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const ANNOUNCEMENT_EVENT = 'gmh-announcement-change'

function getDismissed(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(announcementConfig.dismissKey) === '1'
}

function subscribe(onChange: () => void) {
  window.addEventListener(ANNOUNCEMENT_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(ANNOUNCEMENT_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getDismissed, () => false)

  if (!announcementConfig.enabled || dismissed) {
    return null
  }

  function dismiss() {
    localStorage.setItem(announcementConfig.dismissKey, '1')
    window.dispatchEvent(new Event(ANNOUNCEMENT_EVENT))
  }

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="bg-foreground text-background flex min-h-[var(--announcement-height)] items-center justify-center px-4 text-sm"
    >
      <p className="text-center">
        {announcementConfig.href ? (
          <Link href={announcementConfig.href} className="underline underline-offset-2 hover:no-underline">
            {announcementConfig.message}
          </Link>
        ) : (
          announcementConfig.message
        )}
      </p>
      <button
        type="button"
        onClick={dismiss}
        className={cn(
          'ml-4 min-target shrink-0 rounded-sm px-2 py-1 text-xs underline underline-offset-2',
          'hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        )}
        aria-label="Dismiss announcement"
      >
        Dismiss
      </button>
    </div>
  )
}
