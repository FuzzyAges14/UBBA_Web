import { Link } from 'react-router-dom'

export type ProgramCardProps = {
  title: string
  text: string
  to: string
  ctaLabel: string
  ages?: string
  glyph?: string
  /** Extra class on the glyph span (e.g. social marks). */
  glyphClassName?: string
  /**
   * Heading level for the card title. Use `h2` on listing pages where the
   * page hero is the only H1; keep `h3` under homepage section H2s.
   */
  titleAs?: 'h2' | 'h3'
  /**
   * When true, the entire card is a link and the CTA renders as a span.
   * When false (default), only the CTA is a link.
   */
  wrapLink?: boolean
}

function CardBody({
  title,
  text,
  to,
  ctaLabel,
  ages,
  glyph,
  glyphClassName,
  titleAs: TitleTag = 'h3',
  wrapLink,
}: ProgramCardProps) {
  const cta = wrapLink ? (
    <span className="pcard__cta">
      {ctaLabel} <span className="btn__arrow">→</span>
    </span>
  ) : (
    <Link to={to} className="pcard__cta">
      {ctaLabel} <span className="btn__arrow">→</span>
    </Link>
  )

  return (
    <>
      <div className="pcard__art" />
      <div className="pcard__scrim" />
      {glyph != null && (
        <span
          className={glyphClassName ? `pcard__glyph ${glyphClassName}` : 'pcard__glyph'}
          aria-hidden="true"
        >
          {glyph}
        </span>
      )}
      <div className="pcard__body">
        {ages ? <span className="pcard__age">{ages}</span> : null}
        <TitleTag className="pcard__title">{title}</TitleTag>
        <p className="pcard__text">{text}</p>
        {cta}
      </div>
    </>
  )
}

/** Premium program / discovery card used on Home and program listing pages. */
export default function ProgramCard(props: ProgramCardProps) {
  if (props.wrapLink) {
    return (
      <Link to={props.to} className="pcard">
        <CardBody {...props} />
      </Link>
    )
  }

  return (
    <div className="pcard">
      <CardBody {...props} />
    </div>
  )
}
