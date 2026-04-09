import { useCallback, useEffect, useRef, useState } from 'react'
import introVideo from '@/Assets/introv.mp4'

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const VolumeOnIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

const VolumeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
)

const IntroVideoSection = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const isMutedRef = useRef(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    isMutedRef.current = isMuted
    const el = videoRef.current
    if (el) el.muted = isMuted
  }, [isMuted])

  const safePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = isMutedRef.current
    const p = el.play()
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [])

  const safePause = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    el.pause()
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    const root = sectionRef.current
    if (!el || !root) return

    el.defaultMuted = true
    el.muted = isMutedRef.current

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            const v = videoRef.current
            if (!v) return
            v.muted = isMutedRef.current
            const p = v.play()
            if (p !== undefined) {
              p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
            }
          } else {
            const v = videoRef.current
            if (!v) return
            v.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: [0, 0.35, 0.5, 0.75, 1] },
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = () => {
    if (isPlaying) safePause()
    else safePlay()
  }

  const toggleMute = () => {
    setIsMuted((m) => !m)
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction video"
      className="relative bg-slate-950 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Watch</p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          See how compliance fits your workflow
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-400 sm:text-base">
          Playback starts when this section enters view. Sound stays off until you unmute.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/50 p-2 shadow-2xl shadow-slate-950/50 ring-1 ring-white/10 sm:p-3">
          <div className="relative overflow-hidden rounded-xl bg-black">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src={introVideo}
              muted
              playsInline
              loop
              preload="metadata"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-linear-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/20"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/20"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroVideoSection
