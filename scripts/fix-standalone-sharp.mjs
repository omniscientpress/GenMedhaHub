#!/usr/bin/env node
/**
 * Next.js standalone hoists `sharp` to node_modules/sharp, but pnpm keeps its
 * dependencies as symlinks under .pnpm/. Node ESM resolution from sharp/dist/*.mjs
 * expects @img/colour (and platform binaries) at node_modules/@img/* — copy real dirs.
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const standalone = join(root, '.next', 'standalone')
const nm = join(standalone, 'node_modules')
const pnpm = join(nm, '.pnpm')

if (!existsSync(join(nm, 'sharp'))) {
  console.log('fix-standalone-sharp: no sharp in standalone output, skipping')
  process.exit(0)
}

if (!existsSync(pnpm)) {
  console.error('fix-standalone-sharp: missing node_modules/.pnpm in standalone output')
  process.exit(1)
}

/** @param {string} entry e.g. "@img+colour@1.1.0" or "detect-libc@2.1.2" */
function pnpmEntryToPkgName(entry) {
  if (entry.startsWith('@')) {
    const versionAt = entry.indexOf('@', 1)
    return entry.slice(0, versionAt).replace('+', '/')
  }
  return entry.split('@')[0]
}

/** @param {string} pkgName */
function materialize(pkgName) {
  const prefix = pkgName.replace('/', '+') + '@'
  const entry = readdirSync(pnpm).find((name) => name.startsWith(prefix))
  if (!entry) {
    console.warn(`fix-standalone-sharp: ${pkgName} not found in standalone .pnpm`)
    return false
  }

  const src = join(pnpm, entry, 'node_modules', ...pkgName.split('/'))
  if (!existsSync(src)) {
    console.warn(`fix-standalone-sharp: source missing for ${pkgName} (${src})`)
    return false
  }

  const dest = join(nm, ...pkgName.split('/'))
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { recursive: true, force: true })
  console.log(`fix-standalone-sharp: materialized ${pkgName}`)
  return true
}

const required = ['@img/colour', 'detect-libc', 'semver']
for (const pkg of required) {
  materialize(pkg)
}

// Materialize every sharp platform binary present in the traced standalone output.
for (const entry of readdirSync(pnpm)) {
  if (!entry.startsWith('@img+sharp-')) continue
  materialize(pnpmEntryToPkgName(entry))
}
