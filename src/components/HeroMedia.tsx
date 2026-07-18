import { useEffect, useId, useRef, useState } from 'react'
import { HERO_MEDIA, IMAGE_DIMENSIONS } from '../data/site'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'
import OptimizedImage from './OptimizedImage'

/**
 * Full-bleed hero media: eager poster for LCP, optional autoplaying muted
 * video when conditions allow, with an accessible pause/play control.
 * Local WebM/MP4 paths are preferred when set; Mixkit CDN remains the
 * temporary placeholder fallback.
 */
export default function HeroMedia() {
  const [loadVideo, setLoadVideo] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const labelId = useId()
  const dims = IMAGE_DIMENSIONS.heroPoster

  useEffect(() => {
    setLoadVideo(shouldLoadHeroVideo())
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !loadVideo) return

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.then(() => setPlaying(true)).catch(() => setPlaying(false))
    }

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [loadVideo])

  async function togglePlayback() {
    if (!loadVideo) {
      // Opt-in: user explicitly requested playback (e.g. after reduced-motion skip).
      setLoadVideo(true)
      return
    }

    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try {
        await video.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      video.pause()
      setPlaying(false)
    }
  }

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
          ref={videoRef}
          className="hero__video"
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_MEDIA.poster}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          {HERO_MEDIA.webm && <source src={HERO_MEDIA.webm} type="video/webm" />}
          <source src={HERO_MEDIA.mp4} type="video/mp4" />
        </video>
      )}
      <button
        type="button"
        className="hero__media-toggle"
        onClick={togglePlayback}
        aria-pressed={loadVideo ? playing : false}
        aria-describedby={labelId}
      >
        {loadVideo
          ? playing
            ? 'Pause background video'
            : 'Play background video'
          : 'Play background video'}
      </button>
      <span id={labelId} className="sr-only">
        Decorative background video; audio is muted. Playback is optional.
      </span>
    </>
  )
}
