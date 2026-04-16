import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import T from '../translations'

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

  // Reset when items change (lang switch)
  useEffect(() => {
    setIdx(0)
    setVisible(true)
  }, [items])

  return (
    <p className={className}
       style={{
         opacity: visible ? 1 : 0,
         transform: visible ? 'translateY(0px)' : 'translateY(10px)',
         transition: 'opacity 0.45s ease, transform 0.45s ease',
       }}>
      {items[idx]}
    </p>
  )
}

function FeatureCard({ card, index }) {
  return (
    <div className="card-surface p-7 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between mb-1">
        <span className="section-label">{card.label}</span>
        <span className="font-mono text-[10px] text-ivory/20 tracking-widest">
          0{index + 1} / 03
        </span>
      </div>
      <h3 className="font-sans font-bold text-lg text-ivory leading-snug whitespace-pre-line">
        {card.title}
      </h3>
      <div className="flex-1 flex items-center justify-center rounded-3xl border border-champagne/15 bg-champagne/5 px-6 py-10 min-h-[140px]">
        <AnimatedPhrase
          items={card.phrases}
          className={`font-sans font-semibold text-ivory text-center leading-relaxed whitespace-pre-line ${index === 2 ? 'text-sm' : 'text-base'}`}
        />
      </div>
      <p className="font-sans text-xs text-ivory/35 leading-relaxed mt-auto">
        {card.footer}
      </p>
    </div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const { lang } = useLang()
  const t = T[lang].features

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
            {t.sectionTitle}
          </h2>
        </div>
        <div className="features-grid grid md:grid-cols-3 gap-5 items-stretch">
          {t.cards.map((card, i) => (
            <div key={i} className="feature-card">
              <FeatureCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
