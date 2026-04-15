import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* =============================================
   Shared — fade cycler
   ============================================= */
function AnimatedPhrase({ items, className = '' }) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      const t = setTimeout(() => {
        setIdx(i => (i + 1) % items.length)
        setVisible(true)
      }, 450)
      return () => clearTimeout(t)
    }, 3200)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <p
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(10px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {items[idx]}
    </p>
  )
}

/* =============================================
   CARD 1 — Esperti
   ============================================= */
const ESPERTI_PHRASES = [
  'Personal Trainer sempre presenti in sala',
  'Tutti certificati e qualificati',
  'Pronti a guidarti in ogni esercizio',
]

function EspertiCard() {
  return (
    <div className="card-surface p-7 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between mb-1">
        <span className="section-label">Esperti</span>
        <span className="font-mono text-[10px] text-ivory/20 tracking-widest">01 / 03</span>
      </div>
      <h3 className="font-sans font-bold text-lg text-ivory leading-snug">
        Sempre al tuo fianco,<br />in ogni allenamento.
      </h3>

      <div className="flex-1 flex items-center justify-center rounded-3xl border border-champagne/15 bg-champagne/5 px-6 py-10 min-h-[140px]">
        <AnimatedPhrase
          items={ESPERTI_PHRASES}
          className="font-sans font-semibold text-base text-ivory text-center leading-snug"
        />
      </div>

      <p className="font-sans text-xs text-ivory/35 leading-relaxed mt-auto">
        I nostri personal trainer certificati e qualificati sono sempre presenti in sala per guidarti negli esercizi e supportarti nel tuo percorso.
      </p>
    </div>
  )
}

/* =============================================
   CARD 2 — Attrezzatura
   ============================================= */
const ATTREZZATURA_PHRASES = [
  'Oltre 70 macchinari a tua disposizione',
  'Panatta · Matrix · Precor',
  'Manubri fino a 70 kg',
]

function AttrezzaturaCard() {
  return (
    <div className="card-surface p-7 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <span className="section-label">Attrezzatura</span>
        <span className="font-mono text-[10px] text-ivory/20 tracking-widest">02 / 03</span>
      </div>
      <h3 className="font-sans font-bold text-lg text-ivory leading-snug">
        Oltre 70 macchinari,<br />i migliori al mondo.
      </h3>

      <div className="flex-1 flex items-center justify-center rounded-3xl border border-champagne/15 bg-champagne/5 px-6 py-10 min-h-[140px]">
        <AnimatedPhrase
          items={ATTREZZATURA_PHRASES}
          className="font-sans font-semibold text-base text-ivory text-center leading-snug"
        />
      </div>

      <p className="font-sans text-xs text-ivory/35 leading-relaxed">
        Panatta, Matrix, Precor — i brand leader del fitness professionale — con manubri fino a 70 kg.
      </p>
    </div>
  )
}

/* =============================================
   CARD 3 — Lifestyle
   ============================================= */
const LIFESTYLE_PHRASES = [
  'BIA all\'iscrizione per misurare\nmuscolo e grasso corporeo',
  'Scheda personalizzata\nin base ai tuoi obiettivi',
  'Seguito nelle prime sessioni\nper imparare la tecnica corretta',
]

function LifestyleCard() {
  return (
    <div className="card-surface p-7 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <span className="section-label">Lifestyle</span>
        <span className="font-mono text-[10px] text-ivory/20 tracking-widest">03 / 03</span>
      </div>
      <h3 className="font-sans font-bold text-lg text-ivory leading-snug">
        Il fitness diventa<br />il tuo ritmo.
      </h3>

      <div className="flex-1 flex items-center justify-center rounded-3xl border border-champagne/15 bg-champagne/5 px-6 py-10 min-h-[140px]">
        <AnimatedPhrase
          items={LIFESTYLE_PHRASES}
          className="font-sans font-semibold text-sm text-ivory text-center leading-relaxed whitespace-pre-line"
        />
      </div>

      <p className="font-sans text-xs text-ivory/35 leading-relaxed mt-auto">
        All'iscrizione ricevi una BIA (bioimpedenziometria) per misurare muscolo e grasso corporeo. In base ai tuoi obiettivi ti viene consegnata una scheda personalizzata e sarai seguito nelle prime sessioni per imparare gli esercizi nel modo corretto.
      </p>
    </div>
  )
}

/* =============================================
   FEATURES SECTION
   ============================================= */
export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.features-header', {
        y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.features-header', start: 'top 85%' },
      })
      gsap.from('.feature-card', {
        y: 48, opacity: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servizi" ref={ref} className="bg-obsidian py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="features-header mb-16 md:mb-20">
          <h2 className="font-sans font-black text-[clamp(2rem,4vw,3.5rem)] text-ivory leading-tight tracking-tight">
            Tre motivi per scegliere b12 fitness.
          </h2>
        </div>

        <div className="features-grid grid md:grid-cols-3 gap-5 items-stretch">
          <div className="feature-card"><EspertiCard /></div>
          <div className="feature-card"><AttrezzaturaCard /></div>
          <div className="feature-card"><LifestyleCard /></div>
        </div>
      </div>
    </section>
  )
}
