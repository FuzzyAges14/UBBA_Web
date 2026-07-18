import { useEffect, useId, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type HeroVideoProps = {
  src: string
  poster: string
}

/**
 * Decorative autoplaying hero background video with pause/play control.
 * Respects prefers-reduced-motion (no autoplay; poster shown until user opts in).
 */
export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const reduceMotion = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const labelId = useId()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reduceMotion) {
      video.pause()
      video.removeAttribute('autoplay')
      setPlaying(false)
      return
    }

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false))
      }
    }

    tryPlay()
  }, [reduceMotion, src])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  async function togglePlayback() {
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
      <video
        ref={videoRef}
        className="hero__video"
        muted
        loop
        playsInline
        preload={reduceMotion ? 'none' : 'metadata'}
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        className="hero__media-toggle"
        onClick={togglePlayback}
        aria-pressed={playing}
        aria-describedby={labelId}
      >
        {playing ? 'Pause background video' : 'Play background video'}
      </button>
      <span id={labelId} className="sr-only">
        Decorative background video; audio is muted. Playback is optional.
      </span>
    </>
  )
}
