import Link from 'next/link'

/** Marketing-route 404. Lives under (marketing) so it reuses that group's <html>/<body>. */
export default function NotFound() {
  return (
    <main>
      <h1>404 — Page not found</h1>
      <p>
        <Link href="/">Back to GenMedha Hub</Link>
      </p>
    </main>
  )
}
