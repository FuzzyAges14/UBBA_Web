import type { ImgHTMLAttributes } from 'react'

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'loading'
> & {
  src: string
  alt: string
  width: number
  height: number
  /** Defaults to lazy for below-the-fold media. */
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Optional responsive candidates; pair with `sizes`. */
  srcSet?: string
  sizes?: string
}

/**
 * Image helper that always sets dimensions (CLS) and sensible defaults
 * for loading / decoding. Prefer this over raw `<img>` for content photos.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  srcSet,
  sizes,
  className,
  ...rest
}: OptimizedImageProps) {
  // React 18 warns on camelCase fetchPriority in jsdom; lowercase is valid HTML.
  const priorityAttr =
    fetchPriority === 'auto'
      ? undefined
      : ({ fetchpriority: fetchPriority } as ImgHTMLAttributes<HTMLImageElement>)

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      srcSet={srcSet}
      sizes={sizes}
      className={className}
      {...priorityAttr}
      {...rest}
    />
  )
}
