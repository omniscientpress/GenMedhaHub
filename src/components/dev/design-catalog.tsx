'use client'

import { useState } from 'react'

import { CatalogFormDemo } from '@/components/dev/catalog-form-demo'
import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { TrustStripPlaceholder } from '@/components/shell/site-footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { breadcrumbFixtures } from '@/config/navigation'

function CatalogSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Section spacing="default" className="border-b">
      <Container>
        <Stack gap="6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            {description ? <p className="text-muted-foreground mt-1 text-sm">{description}</p> : null}
          </div>
          {children}
        </Stack>
      </Container>
    </Section>
  )
}

function StateRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export function DesignCatalog() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Section spacing="lg" className="border-b bg-muted/20">
        <Container>
          <Stack gap="4">
            <Badge variant="outline">Internal — noindex</Badge>
            <h1 className="text-4xl font-bold tracking-tight">Design System Catalog</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Phase 1 token freeze gate. Every primitive in default, hover, focus, and disabled
              states. Run axe DevTools against this page for WCAG 2.2 AA verification.
            </p>
          </Stack>
        </Container>
      </Section>

      <CatalogSection title="Buttons" description="CTA variants keyed to ch. 2.9 CTA bank.">
        <Stack gap="6">
          <StateRow label="Default variants">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </StateRow>
          <StateRow label="CTA variants">
            <Button variant="cta-primary">Book a discovery call</Button>
            <Button variant="cta-scope">Scope my app</Button>
            {/* cta-audit retained as optional token for complimentary add-on services, not a pillar */}
            <Button variant="cta-audit">Get a growth audit</Button>
          </StateRow>
          <StateRow label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon button">
              →
            </Button>
          </StateRow>
          <StateRow label="Disabled">
            <Button disabled>Disabled default</Button>
            <Button variant="cta-primary" disabled>
              Disabled CTA
            </Button>
          </StateRow>
        </Stack>
      </CatalogSection>

      <CatalogSection title="Badges">
        <StateRow label="Variants">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </StateRow>
      </CatalogSection>

      <CatalogSection title="Card">
        <Grid cols={2}>
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Supporting description for card content.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card body — bases CaseStudyCardList and PricingTable blocks.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle>Disabled context</CardTitle>
              <CardDescription>Muted card for non-interactive preview states.</CardDescription>
            </CardHeader>
          </Card>
        </Grid>
      </CatalogSection>

      <CatalogSection title="Separator">
        <div className="max-w-md space-y-4">
          <p className="text-sm">Content above</p>
          <Separator />
          <p className="text-sm">Content below</p>
        </div>
      </CatalogSection>

      <CatalogSection title="Table">
        <Table>
          <TableCaption>Engagement models — footnote citation slot mandatory on ComparisonTable.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Timeline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Discovery</TableCell>
              <TableCell>$5,000</TableCell>
              <TableCell>2 weeks</TableCell>
            </TableRow>
            <TableRow data-state="selected">
              <TableCell>Build</TableCell>
              <TableCell>$40,000</TableCell>
              <TableCell>8–12 weeks</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CatalogSection>

      <CatalogSection title="Accordion" description="Client island — mobile nav and FAQ patterns.">
        <Accordion type="single" collapsible className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>What platforms do you support?</AccordionTrigger>
            <AccordionContent>
              Medusa, Vendure, Shopify, Shopify Plus, Hydrogen, Adobe Commerce, and Magento Open
              Source.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long does a migration take?</AccordionTrigger>
            <AccordionContent>Timeline depends on catalog size, integrations, and data quality.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CatalogSection>

      <CatalogSection title="Dialog & Sheet" description="Client islands — Cal.com pop-up and mobile menu.">
        <div className="flex flex-wrap gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a discovery call</DialogTitle>
                <DialogDescription>
                  Cal.com embed renders here in production. Keyboard-trap verified.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="cta-primary">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-muted-foreground self-center text-sm">Sheet: use mobile menu in header.</p>
        </div>
      </CatalogSection>

      <CatalogSection title="Form controls" description="plugin-form-builder render pattern.">
        <Grid cols={2} gap="8">
          <Stack gap="4">
            <StateRow label="Input states">
              <div className="w-full max-w-xs space-y-3">
                <Input placeholder="Default input" />
                <Input placeholder="Disabled input" disabled />
                <Input placeholder="Invalid input" aria-invalid="true" defaultValue="bad@" />
              </div>
            </StateRow>
            <StateRow label="Textarea">
              <Textarea placeholder="Default textarea" className="max-w-xs" />
            </StateRow>
            <StateRow label="Checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="catalog-check" />
                <Label htmlFor="catalog-check">Consent checkbox</Label>
              </div>
            </StateRow>
          </Stack>
          <div>
            <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wide uppercase">
              Full form with validation
            </p>
            <CatalogFormDemo />
          </div>
        </Grid>
      </CatalogSection>

      <CatalogSection title="Layout primitives">
        <Grid cols={3}>
          <div className="rounded-md border border-dashed p-4 text-center text-sm">Container wraps all sections</div>
          <div className="rounded-md border border-dashed p-4 text-center text-sm">Grid — 3 columns at lg</div>
          <div className="rounded-md border border-dashed p-4 text-center text-sm">Stack — vertical rhythm</div>
        </Grid>
      </CatalogSection>

      <CatalogSection title="Shell — breadcrumbs (depth 3 fixtures)">
        <Stack gap="4">
          {breadcrumbFixtures.map((segments, index) => (
            <div key={index} className="overflow-hidden rounded-md border">
              <Breadcrumbs segments={[...segments]} />
            </div>
          ))}
        </Stack>
      </CatalogSection>

      <CatalogSection title="Shell — trust strip">
        <Stack gap="4">
          <TrustStripPlaceholder show={false} />
          <TrustStripPlaceholder show={true} />
        </Stack>
      </CatalogSection>

      <CatalogSection title="Focus & motion">
        <Stack gap="4">
          <p className="text-sm">
            Tab through this page to verify visible focus indicators on every interactive element.
            Animations respect <code className="text-xs">prefers-reduced-motion</code> via globals.css.
          </p>
          <StateRow label="Focus targets (24×24 minimum)">
            <Button size="icon" aria-label="Focus test 1">
              1
            </Button>
            <Button size="icon" aria-label="Focus test 2">
              2
            </Button>
            <Button size="icon" aria-label="Focus test 3">
              3
            </Button>
          </StateRow>
        </Stack>
      </CatalogSection>
    </>
  )
}
