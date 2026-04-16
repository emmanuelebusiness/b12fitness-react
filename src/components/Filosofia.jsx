import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import T from '../translations'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [
  '/gallery/DSC02530.jpg',
  '/gallery/DSC02563.jpg',
  '/gallery/DSC02572.jpg',
  '/gallery/DSC02574.jpg',
  '/gallery/DSC02792.jpg',
  '/gallery/DSC02802.jpg',
  '/gallery/DSC02813.jpg',
  '/gallery/DSC02815.jpg',
]

function Carousel() {
  const [current, setCurrent] = useState(0)
  const startX   = useRef(null)
  const dragging = useRef(false)
  const total    = PHOTOS.length

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total])

  const onPointerDown = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
    dragging.current = true
  }
  const onPointerUp = (e) => {
    if (!dragging.current) return
    dragging.current = false
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = startX.current - endX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  return (
    <div className="relative w-full rounded-4xl overflow-hidden select-none"
         style={{ aspectRatio: '16/9' }}
         onMouseDown={onPointerDown} onMouseUp={onPointerUp}
         onTouchStart={onPointerDown} onTouchEnd={onPointerUp}>

      <div className="flex h-full"
           style={{
             transform: `translateX(-${current * (100 / total)}%)`,
             transition: 'transform 0.55s cubic-bezier(0.77,0,0.18,1)',
             width: `${total * 100}%`,
           }}>
        {PHOTOS.map((src, i) => (
          <div key={src} className="h-full flex-shrink-0" style={{ width: `${100 / total}%` }}>
            <img src={src} alt={`b12 fitness — foto ${i + 1}`}
                 className="w-full h-full object-cover object-center" draggable="false" />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ardesia/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ardesia/60 to-transparent pointer-events-none" />

      <button onClick={prev} aria-label="Foto precedente"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                         w-11 h-11 rounded-full bg-obsidian/70 border border-white/10
                         flex items-center justify-center text-ivory/60 hover:text-ivory
                         hover:bg-obsidian/90 transition-all duration-200 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <button onClick={next} aria-label="Foto successiva"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                         w-11 h-11 rounded-full bg-obsidian/70 border border-white/10
                         flex items-center justify-center text-ivory/60 hover:text-ivory
                         hover:bg-obsidian/90 transition-all duration-200 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {PHOTOS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Foto ${i + 1}`}
                  className={`rounded-full transition-all duration-300
                              ${i === current ? 'w-5 h-1.5 bg-champagne' : 'w-1.5 h-1.5 bg-ivory/30 hover:bg-ivory/60'}`} />
        ))}
      </div>

      <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-ivory/40 tracking-widest
                      bg-obsidian/50 backdrop-blur-sm px-3 py-1 rounded-full">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function Filosofia() {
  const ref = useRef(null)
  const { lang } = useLang()
  const t = T[lang].filosofia

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.filo-carousel', {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.filo-carousel', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="chi-siamo" ref={ref} className="bg-ardesia py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="filo-carousel font-sans font-black text-[clamp(1.8rem,3.5vw,3rem)] text-ivory leading-tight tracking-tight mb-10">
          {t.carouselTitle}
        </h2>
        <div className="filo-carousel">
          <Carousel />
        </div>
      </div>
    </section>
  )
}
