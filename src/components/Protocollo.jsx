import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import T from '../translations'

gsap.registerPlugin(ScrollTrigger)

function ConcentricCircles() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-60">
      <style>{`
        .cc-1 { animation: spin 8s linear infinite; transform-origin: 60px 60px; }
        .cc-2 { animation: spin 12s linear infinite reverse; transform-origin: 60px 60px; }
        .cc-3 { animation: spin 6s linear infinite; transform-origin: 60px 60px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <circle cx="60" cy="60" r="48" stroke="rgba(34,230,0,0.2)" strokeWidth="1"/>
      <circle cx="60" cy="60" r="36" stroke="rgba(34,230,0,0.3)" strokeWidth="0.8"/>
      <circle cx="60" cy="60" r="24" stroke="rgba(34,230,0,0.4)" strokeWidth="0.8"/>
      <circle cx="60" cy="60" r="12" stroke="rgba(34,230,0,0.6)" strokeWidth="1"/>
      <circle cx="60" cy="12" r="3" fill="#22E600" className="cc-1"/>
      <circle cx="96" cy="60" r="2" fill="rgba(34,230,0,0.5)" className="cc-2"/>
      <circle cx="60" cy="36" r="2.5" fill="rgba(34,230,0,0.7)" className="cc-3"/>
      <line x1="60" y1="60" x2="60" y2="14" stroke="rgba(34,230,0,0.3)" strokeWidth="0.5" className="cc-1"/>
      <line x1="60" y1="60" x2="96" y2="60" stroke="rgba(34,230,0,0.2)" strokeWidth="0.5" className="cc-2"/>
    </svg>
  )
}

function LaserGrid() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-70">
      <style>{`
        .laser-line { animation: laser-scan 2.5s ease-in-out infinite; }
        .laser-glow { animation: laser-scan 2.5s ease-in-out infinite; filter: blur(2px); opacity: 0.4; }
        @keyframes laser-scan {
          0%   { transform: translateY(0px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(96px); opacity: 0; }
        }
        .dot-lit { animation: dot-pulse 2.5s ease-in-out infinite; }
        @keyframes dot-pulse {
          0%, 100% { fill: rgba(34,230,0,0.15); }
          50%       { fill: rgba(34,230,0,0.7); }
        }
      `}</style>
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={12 + col * 16} cy={12 + row * 16} r="1.5"
                  className="dot-lit" style={{ animationDelay: `${(row * 7 + col) * 0.05}s` }} />
        ))
      )}
      <line x1="4" y1="12" x2="116" y2="12" stroke="#22E600" strokeWidth="1.5" className="laser-line"/>
      <line x1="4" y1="12" x2="116" y2="12" stroke="#22E600" strokeWidth="8" className="laser-glow"/>
    </svg>
  )
}

function ECGWave() {
  return (
    <svg viewBox="0 0 200 80" fill="none" className="w-full h-auto opacity-80">
      <path d="M0 40 L30 40 L40 40 L50 10 L60 70 L70 40 L80 40 L90 40 L100 40 L110 40 L120 10 L130 70 L140 40 L150 40 L160 40 L170 40 L200 40"
            stroke="#22E600" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M0 40 L30 40 L40 40 L50 10 L60 70 L70 40 L80 40 L90 40 L100 40 L110 40 L120 10 L130 70 L140 40 L150 40 L160 40 L170 40 L200 40"
            stroke="rgba(34,230,0,0.15)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const VIZS = [ConcentricCircles, LaserGrid, ECGWave]
const BGS  = ['from-ardesia to-obsidian', 'from-[#0f180f] to-obsidian', 'from-[#0c150c] to-obsidian']

export default function Protocollo() {
  const containerRef = useRef(null)
  const { lang } = useLang()
  const t = T[lang].protocollo

  useEffect(() => {
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.proto-inner')

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          ScrollTrigger.create({
            trigger: card.closest('.proto-card'),
            start: 'top top',
            end: `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress
              gsap.set(card, {
                scale:   gsap.utils.interpolate(1, 0.92, progress),
                opacity: gsap.utils.interpolate(1, 0.45, progress),
                filter:  `blur(${gsap.utils.interpolate(0, 16, progress)}px)`,
              })
            },
          })
        })

        cards.forEach((card) => {
          gsap.from(card.querySelectorAll('.proto-content-item'), {
            y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: {
              trigger: card.closest('.proto-card'),
              start: 'top 80%',
            },
          })
        })
      }, containerRef)
      return () => ctx.revert()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="protocollo" ref={containerRef} className="bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-8">
        <span className="section-label block mb-3">{t.sectionLabel}</span>
        <h2 className="font-sans font-black text-[clamp(2rem,4vw,3.5rem)] text-ivory leading-tight tracking-tight">
          {t.sectionTitle}
        </h2>
      </div>

      {t.steps.map((step, i) => {
        const Viz = VIZS[i]
        return (
          <div key={step.num} className="proto-card">
            <div className={`proto-inner w-full h-screen bg-gradient-to-b ${BGS[i]}
                             flex items-center justify-center px-6 md:px-12`}
                 style={{ willChange: 'transform, opacity, filter' }}>
              <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="flex flex-col gap-6">
                  <div className="proto-content-item flex items-center gap-4">
                    <span className="font-mono text-xs text-champagne/50 tracking-widest">{step.num}</span>
                    <span className="section-label">{step.label}</span>
                  </div>
                  <h3 className="proto-content-item font-sans font-black
                                 text-[clamp(2rem,3.5vw,3.2rem)] text-ivory leading-tight tracking-tight">
                    {step.title}
                  </h3>
                  <p className="proto-content-item font-sans text-ivory/50 text-base md:text-lg
                                leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
                <div className="proto-content-item hidden md:flex items-center justify-center">
                  <div className="w-72 h-72 md:w-80 md:h-80">
                    {i === 2
                      ? <div className="w-full flex items-center"><Viz /></div>
                      : <Viz />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className="h-24" />
    </section>
  )
}
