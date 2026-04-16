import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import T from '../translations'

export default function Navbar() {
  const { lang, setLang } = useLang()
  const t = T[lang].navbar

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ---- Pill Navbar ---- */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl
                    transition-all duration-500 rounded-3xl
                    ${scrolled
                      ? 'bg-obsidian/90 backdrop-blur-xl border border-white/10 shadow-2xl'
                      : 'bg-black/30 backdrop-blur-md border border-white/5'}`}
      >
        <nav className="flex flex-col items-center px-6 pt-3 pb-2.5">

          {/* RIGA 1 — Logo centrato */}
          <div className="flex items-center justify-between w-full mb-1">
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="text-ivory/70 hover:text-ivory transition-colors"
                aria-label="Menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <a href="#hero" onClick={e => handleLink(e, '#hero')}
                 className="block transition-opacity duration-200 hover:opacity-80"
                 aria-label="b12 fitness — home">
                <img src="/logo.png" alt="b12 fitness"
                     className="h-14 md:h-16 w-auto object-contain"
                     style={{ filter: 'drop-shadow(0 0 10px rgba(34,230,0,0.3))' }} />
              </a>
            </div>

            {/* Lang switcher */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-ivory/30">
              <button onClick={() => setLang('IT')}
                      className={`transition-colors ${lang === 'IT' ? 'text-ivory' : 'hover:text-ivory/60'}`}>
                IT
              </button>
              <span>/</span>
              <button onClick={() => setLang('EN')}
                      className={`transition-colors ${lang === 'EN' ? 'text-ivory' : 'hover:text-ivory/60'}`}>
                EN
              </button>
            </div>
            <div className="md:hidden w-5" />
          </div>

          {/* RIGA 2 — Links + CTA */}
          <div className="hidden md:flex items-center justify-center gap-7 pt-1.5 pb-0.5 border-t border-white/5 w-full mt-1">
            {t.links.map(({ label, href }) => (
              <a key={href} href={href} onClick={e => handleLink(e, href)} className="nav-link">
                {label}
              </a>
            ))}
            <a href="#contatti" onClick={e => handleLink(e, '#contatti')}
               className="btn-primary text-xs px-5 py-2 ml-2">
              <span className="btn-layer" />
              {t.cta}
            </a>
          </div>

        </nav>
      </header>

      {/* ---- Mobile fullscreen menu ---- */}
      <div className={`fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl
                       flex flex-col items-center justify-center gap-10
                       transition-all duration-400
                       ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        <img src="/logo.png" alt="b12 fitness"
             className="h-20 w-auto object-contain mb-4"
             style={{ mixBlendMode: 'screen' }} />

        {/* Lang switcher mobile */}
        <div className="flex items-center gap-3 font-mono text-sm text-ivory/40">
          <button onClick={() => setLang('IT')}
                  className={`transition-colors ${lang === 'IT' ? 'text-ivory' : 'hover:text-ivory/60'}`}>
            IT
          </button>
          <span>/</span>
          <button onClick={() => setLang('EN')}
                  className={`transition-colors ${lang === 'EN' ? 'text-ivory' : 'hover:text-ivory/60'}`}>
            EN
          </button>
        </div>

        {t.links.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => handleLink(e, href)}
             className="font-sans font-bold text-3xl text-ivory/60 hover:text-ivory transition-colors tracking-wide">
            {label}
          </a>
        ))}
        <a href="#contatti" onClick={e => handleLink(e, '#contatti')}
           className="btn-primary mt-4">
          <span className="btn-layer" />
          {t.cta}
        </a>
      </div>
    </>
  )
}
