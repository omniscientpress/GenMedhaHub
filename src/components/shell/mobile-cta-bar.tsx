'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { ctaConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/** Sticky mobile footer CTA — fires cta_click analytics event on tap (ch. 4.2). */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    if (typeof window !== 'undefined' && 'umami' in window) {
      ;(window as Window & { umami?: { track: (event: string, data?: Record<string, string>) => void } }).umami?.track(
        ctaConfig.mobileEventName,
        ctaConfig.mobileEventPayload,
      )
    }
  }

  return (
    <div
      className={cn(
        'border-t bg-background/95 fixed inset-x-0 bottom-0 z-50 p-3 backdrop-blur-sm transition-transform duration-200 md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Book a call"
    >
      <Button variant="cta-primary" className="w-full" asChild onClick={handleClick}>
        <Link href={ctaConfig.mobileHref}>{ctaConfig.mobileLabel}</Link>
      </Button>
    </div>
  )
}
