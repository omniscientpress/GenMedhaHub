/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React, { Suspense } from 'react'

import { importMap } from './admin/importMap.js'
import './custom.css'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

/**
 * Keep the admin page slot inside a Server Component + Suspense boundary before it
 * crosses Payload's client RootProvider. Without this, some production standalone
 * builds serialize RootProvider children as `null` and /admin stays blank.
 *
 * deploy-marker: admin-fix-v7-suspense
 */
function AdminPageSlot({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <AdminPageSlot>{children}</AdminPageSlot>
  </RootLayout>
)

export default Layout
