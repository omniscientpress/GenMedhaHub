// Root 404 — lives at src/app/not-found.tsx (the (utility) group is reserved
// for later utility pages). Must render its own <html>/<body> because the root
// layout lives inside the (marketing) route group.
import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>404 — Page not found</h1>
          <p>
            <Link href="/">Back to GenMedha Hub</Link>
          </p>
        </main>
      </body>
    </html>
  )
}
