import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  /** Defaults to h2; use h1 only for page-level heroes outside PageHero. */
  titleAs?: 'h1' | 'h2'
}

/** Consistent eyebrow + title + optional lead used across marketing sections. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  titleAs: TitleTag = 'h2',
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <TitleTag className="section-title">{title}</TitleTag>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </>
  )
}
