/**
 * Full-bleed hero backdrop.
 *
 * Authentic UBBA dojang footage is not available yet. The previous WebsiteDojo /
 * Vimeo stock loop is intentionally not used (licensing). Until the academy
 * provides owned hero media, we render a brand atmosphere panel only — no
 * third-party video or stock photography.
 */
export default function HeroMedia() {
  return (
    <div className="hero__brand-media" aria-hidden="true">
      <div className="hero__brand-wash" />
      <div className="hero__brand-beam" />
      <div className="hero__brand-belt" />
    </div>
  )
}
