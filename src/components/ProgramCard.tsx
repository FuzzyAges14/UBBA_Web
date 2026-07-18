import { Link } from 'react-router-dom'
import OptimizedImage from './OptimizedImage'
import { imageDimensionsFor } from '../data/site'

export type ProgramCardProps = {
  title: string
  text: string
  to: string
  ctaLabel: string
  ages?: string
  glyph?: string
  /** Optional photo; falls back to the gradient art panel when omitted. */
  image?: string
  /** Extra class on the glyph span (e.g. social marks). */
  glyphClassName?: string
  /**
   * When true, the entire card is a link and the CTA renders as a span.
   * When false (default), only the CTA is a link.
   */
  wrapLink?: boolean
  /** Responsive `sizes` for the card image. */
  imageSizes?: string
}

function CardBody({
  title,
  text,
  to,
  ctaLabel,
  ages,
  glyph,
  glyphClassName,
  wrapLink,
  image,
  imageSizes = '(max-width: 720px) 100vw, 33vw',
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
      {image ? (
        <OptimizedImage
          className="pcard__img"
          src={image}
          alt=""
          {...imageDimensionsFor(image)}
          loading="lazy"
          sizes={imageSizes}
        />
      ) : (
        <div className="pcard__art" />
      )}
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
        <h3 className="pcard__title">{title}</h3>
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
