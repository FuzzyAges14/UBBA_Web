/**
 * Route-level Suspense fallback. Kept minimal so code-split navigations
 * feel intentional without introducing a second visual system.
 */
export default function PageFallback() {
  return (
    <div className="page-fallback" role="status" aria-live="polite">
      <span className="page-fallback__label">Loading…</span>
    </div>
  )
}
