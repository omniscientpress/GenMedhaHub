'use client'

// lucide-react: menu icon for mobile nav trigger.
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/layout/container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { isNavGroup, type NavGroup, type NavItem } from '@/config/navigation'
import type { ShellContent } from '@/lib/cms/navigation'
import { cn } from '@/lib/utils'

function NavDropdownContent({ item }: { item: NavGroup }) {
  if (item.groups) {
    return (
      <div className="grid gap-4 p-4 md:w-[32rem] md:grid-cols-2">
        {item.groups.map((group) => (
          <div key={group.heading}>
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
              {group.heading}
            </p>
            <ul className="space-y-1">
              {group.items.map((link) => (
                <li key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className="hover:bg-accent hover:text-accent-foreground block rounded-md px-2 py-1.5 text-sm"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ul className="grid gap-1 p-4 md:w-56">
      {item.items?.map((link) => (
        <li key={link.href}>
          <NavigationMenuLink asChild>
            <Link
              href={link.href}
              className="hover:bg-accent hover:text-accent-foreground block rounded-md px-2 py-1.5 text-sm"
            >
              {link.label}
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

function MobileNavSection({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!isNavGroup(item)) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="hover:bg-accent flex min-h-11 items-center rounded-md px-3 text-sm font-medium"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={item.label} className="border-none">
        <AccordionTrigger className="px-3 py-2 hover:no-underline">{item.label}</AccordionTrigger>
        <AccordionContent className="px-3 pb-2">
          {item.groups ? (
            <div className="space-y-4">
              {item.groups.map((group) => (
                <div key={group.heading}>
                  <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase">
                    {group.heading}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="hover:bg-accent block rounded-md px-2 py-2 text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-1">
              {item.items?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="hover:bg-accent block rounded-md px-2 py-2 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function SiteHeader({ shell }: { shell: ShellContent }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { brandName, logoUrl, logoAlt, primaryNav, headerCtaHref, headerCtaLabel, mobileCtaHref, mobileCtaLabel } =
    shell

  return (
    <header className="border-b bg-background/95 sticky top-0 z-40 backdrop-blur-sm" role="banner">
      <Container>
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link
            href="/"
            className="text-foreground inline-flex items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- CMS logo; 216×62 slot (ch. 4.2)
              <img
                src={logoUrl}
                alt={logoAlt}
                width={216}
                height={62}
                className="h-[62px] w-auto max-w-[216px] object-contain object-left"
              />
            ) : (
              <span className="text-lg font-bold tracking-tight">{brandName}</span>
            )}
          </Link>

          {/* Desktop nav — ch. 3.3 order, dropdowns on Services/Platforms/Migrate/Solutions */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {primaryNav.map((item) =>
                isNavGroup(item) ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavDropdownContent item={item} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href} className={cn('px-4 py-2 text-sm font-medium')}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button variant="cta-primary" className="hidden sm:inline-flex" asChild>
              <Link href={headerCtaHref}>{headerCtaLabel}</Link>
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>{brandName}</SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile primary navigation" className="mt-4 space-y-1">
                  {primaryNav.map((item) => (
                    <MobileNavSection
                      key={isNavGroup(item) ? item.label : item.href}
                      item={item}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
                <div className="mt-6">
                  <Button variant="cta-primary" className="w-full" asChild>
                    <Link href={mobileCtaHref} onClick={() => setMobileOpen(false)}>
                      {mobileCtaLabel}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
