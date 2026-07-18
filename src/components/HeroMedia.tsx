import { useEffect, useState } from 'react'
import { HERO_MEDIA, IMAGE_DIMENSIONS } from '../data/site'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'
import OptimizedImage from './OptimizedImage'

/**
 * Full-bleed hero media: eager poster for LCP, optional autoplaying muted
 * video when conditions allow. Local WebM/MP4 paths are preferred when set;
 * Mixkit CDN remains the temporary placeholder fallback.
 */
export default function HeroMedia() {
  const [loadVideo, setLoadVideo] = useState(false)
  const dims = IMAGE_DIMENSIONS.heroPoster

  useEffect(() => {
    setLoadVideo(shouldLoadHeroVideo())
  }, [])

  return (
    <>
      <OptimizedImage
        className="hero__poster"
        src={HERO_MEDIA.poster}
        alt=""
        width={dims.width}
        height={dims.height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        aria-hidden="true"
      />
      {loadVideo && (
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_MEDIA.poster}
          aria-hidden="true"
        >
          {HERO_MEDIA.webm && <source src={HERO_MEDIA.webm} type="video/webm" />}
          <source src={HERO_MEDIA.mp4} type="video/mp4" />
        </video>
      )}
    </>
  )
}
