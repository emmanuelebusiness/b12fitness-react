import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Servizi',   href: '#servizi' },
  { label: 'Metodo',    href: '#protocollo' },
  { label: 'Contatti',  href: '#contatti' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [lang,       setLang]       = useState('IT')
  const heroRef = useRef(null)

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

  // Lock body scroll when mobile menu open
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
            {/* Mobile: hamburger a sinistra */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="text-ivory/70 hover:text-ivory transition-colors"
                aria-label="Menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Logo — centrato assoluto */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <a
                href="#hero"
                onClick={e => handleLink(e, '#hero')}
                className="block transition-opacity duration-200 hover:opacity-80"
                aria-label="b12 fitness — home"
              >
                <img
                  src="/logo.png"
                  alt="b12 fitness"
                  className="h-14 md:h-16 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(34,230,0,0.3))' }}
                />
              </a>
            </div>

            {/* Spacer destra su mobile / lang switcher su desktop */}
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
            <div className="md:hidden w-5" /> {/* spacer mobile destra */}
          </div>

          {/* RIGA 2 — Links + CTA sulla stessa linea, sotto il logo */}
          <div className="hidden md:flex items-center justify-center gap-7 pt-1.5 pb-0.5 border-t border-white/5 w-full mt-1">
            {links.map(({ label, href }) => (
              <a key={href} href={href} onClick={e => handleLink(e, href)} className="nav-link">
                {label}
              </a>
            ))}
            <a href="#contatti" onClick={e => handleLink(e, '#contatti')}
               className="btn-primary text-xs px-5 py-2 ml-2">
              <span className="btn-layer" />
              Richiedi Informazioni
            </a>
          </div>

        </nav>
      </header>

      {/* ---- Mobile fullscreen menu ---- */}
      <div className={`fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl
                       flex flex-col items-center justify-center gap-10
                       transition-all duration-400
                       ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        {/* Logo nel menu mobile */}
        <img
          src="/logo.png"
          alt="b12 fitness"
          className="h-20 w-auto object-contain mb-4"
          style={{ mixBlendMode: 'screen' }}
        />

        {links.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => handleLink(e, href)}
             className="font-sans font-bold text-3xl text-ivory/60 hover:text-ivory transition-colors tracking-wide">
            {label}
          </a>
        ))}
        <a href="#contatti" onClick={e => handleLink(e, '#contatti')}
           className="btn-primary mt-4">
          <span className="btn-layer" />
          Richiedi Informazioni
        </a>
      </div>
    </>
  )
}
