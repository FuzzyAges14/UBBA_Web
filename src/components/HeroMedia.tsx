import { useEffect, useId, useRef, useState } from 'react'
import { HERO_MEDIA, IMAGE_DIMENSIONS } from '../data/site'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'
import OptimizedImage from './OptimizedImage'

/**
 * Full-bleed hero media: eager poster for LCP, optional autoplaying muted
 * video when conditions allow. Includes an accessible pause/play control and
 * respects prefers-reduced-motion (no autoplay via heroMediaPolicy; user may
 * opt in with the control).
 */
export default function HeroMedia() {
  const dims = IMAGE_DIMENSIONS.heroPoster
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loadVideo, setLoadVideo] = useState(false)
  const [wantPlaying, setWantPlaying] = useState(false)
  const [playing, setPlaying] = useState(false)
  const labelId = useId()

  useEffect(() => {
    const allowed = shouldLoadHeroVideo()
    setLoadVideo(allowed)
    // Autoplay only when the performance policy allows it (already excludes
    // reduced-motion, Save-Data, slow-2g, and narrow viewports).
    setWantPlaying(allowed)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !loadVideo) return

    if (!wantPlaying) {
      video.pause()
      setPlaying(false)
      return
    }

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }, [loadVideo, wantPlaying])

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
  }, [loadVideo])

  function togglePlayback() {
    if (!loadVideo) {
      // Explicit opt-in (e.g. reduced-motion or previously blocked policy).
      setLoadVideo(true)
      setWantPlaying(true)
      return
    }
    setWantPlaying((v) => !v)
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
