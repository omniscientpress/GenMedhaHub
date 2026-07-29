// eslint-config-next 16 ships native flat configs (FlatCompat is no longer needed —
// Next 16 removed `next lint`, so we run plain `eslint .`).
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'src/payload-types.ts',
      'src/app/(payload)/admin/importMap.js',
    ],
  },
  ...nextVitals,
  ...nextTs,
]

export default config
