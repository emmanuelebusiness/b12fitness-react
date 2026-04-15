import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'


const WHATSAPP_NUMBER = '393923704212'
const WHATSAPP_MSG    = encodeURIComponent('Ciao! Vorrei prenotare una prova gratuita in palestra.')
const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.522 5.854L0 24l6.338-1.498A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.98.997-3.648-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
  </svg>
)

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-label',  { y: 24, opacity: 0, duration: 0.9 }, 0.3)
        .from('.hero-line-1', { y: 48, opacity: 0, duration: 1.0 }, 0.45)
        .from('.hero-line-2', { y: 48, opacity: 0, duration: 1.0 }, 0.58)
        .from('.hero-sub',    { y: 24, opacity: 0, duration: 0.8 }, 0.72)
        .from('.hero-card',   { x: 40, opacity: 0, duration: 0.9 }, 0.65)
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, 1.1)
    }, ref)

    return () => ctx.revert()
  }, [])

  const handleScroll = () => {
    const el = document.getElementById('chi-siamo')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex items-end min-h-[100dvh] overflow-hidden"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient overlay: near-black from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]/15" />
      {/* Left vignette con sottile tinta verde */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#081008]/70 via-transparent to-transparent" />

      {/* Content — two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">

          {/* Left — title + subtitle */}
          <div className="max-w-2xl">
            {/* Location label */}
            <p className="hero-label font-mono text-xs tracking-[0.2em] uppercase text-champagne/80 mb-6">
              Peschiera del Garda — Via Tangenziale 3
            </p>

            {/* Hero title */}
            <h1 className="mb-6 leading-none">
              <span className="hero-line-1 block font-sans font-black text-[clamp(2.2rem,4.5vw,4rem)] text-ivory/60 tracking-tight">
                La tua palestra
              </span>
              <span className="hero-line-2 block font-serif italic text-[clamp(3.5rem,9vw,8rem)] text-champagne leading-none -mt-1">
                sul&nbsp;Lago di Garda.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-sub font-sans text-ivory/55 text-base md:text-lg font-light leading-relaxed max-w-xl">
              La tua palestra a Peschiera del Garda — dove ogni allenamento
              diventa uno stile di vita, guidato da esperti con trent'anni di esperienza.
            </p>
          </div>

          {/* Right — WhatsApp card */}
          <div className="hero-card card-surface p-8 md:p-10 flex flex-col items-center justify-center gap-8 text-center min-h-[320px]">

            {/* WhatsApp icon */}
            <div className="w-20 h-20 rounded-full bg-champagne/10 border border-champagne/20
                            flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-champagne">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.522 5.854L0 24l6.338-1.498A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.98.997-3.648-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
              </svg>
            </div>

            <div>
              <h3 className="font-sans font-bold text-xl text-ivory mb-3">
                Richiedi Informazioni
              </h3>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full max-w-sm justify-center gap-3"
            >
              <span className="btn-layer" />
              <WaIcon />
              Scrivici su WhatsApp
            </a>


          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll absolute bottom-8 right-8 md:right-12 z-10
                   flex flex-col items-center gap-2 text-ivory/30 hover:text-ivory/60
                   transition-colors duration-300"
        onClick={handleScroll}
        aria-label="Scorri"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase rotate-90 origin-center translate-y-4">
          scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-ivory/0 to-ivory/30 mt-6" />
      </button>
    </section>
  )
}
