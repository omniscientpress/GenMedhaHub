'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const demoSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  role: z.string().min(1, 'Select a role.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  consent: z.boolean().refine((v) => v, 'Consent is required for gated forms.'),
})

type DemoFormValues = z.infer<typeof demoSchema>

export function CatalogFormDemo() {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      email: '',
      role: '',
      message: '',
      consent: false,
    },
  })

  return (
    <Form {...form}>
      <form
        className="max-w-md space-y-4"
        onSubmit={form.handleSubmit(() => undefined)}
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
              </FormControl>
              <FormDescription>We respond within one business day.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="pm">Product Manager</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your project..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to be contacted about this inquiry.</FormLabel>
                <FormDescription>Required for gated forms (ch. 4.2 consent surface).</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit (demo)</Button>
      </form>
    </Form>
  )
}
