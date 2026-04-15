const NAV_LINKS = [
  { label: 'Chi Siamo',   href: '#chi-siamo' },
  { label: 'Servizi',     href: '#servizi' },
  { label: 'Il Metodo',   href: '#protocollo' },
  { label: 'Contatti',    href: '#contatti' },
]

const LEGAL_LINKS = [
  'Rendicontazione Pubblica',
  'Codice di Condotta',
  'Modello Organizzativo',
  'Modulo Segnalazione',
  'Responsabile Safeguarding',
  'Privacy & Cookie Policy',
]

const handleNav = (e, href) => {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-[#070a07] rounded-t-6xl mt-0 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16 pb-16 border-b border-white/5">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <a href="#hero" onClick={e => handleNav(e, '#hero')}
               className="block hover:opacity-80 transition-opacity w-fit">
              <img
                src="/logo.png"
                alt="b12 fitness"
                className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 6px rgba(34,230,0,0.2))' }}
              />
            </a>
            <p className="font-sans text-sm text-ivory/35 leading-relaxed max-w-[220px]">
              La palestra premium sul Lago di Garda. Benessere, performance, stile di vita.
            </p>
            <p className="font-mono text-xs text-ivory/20">P.IVA 04449260233</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">Navigazione</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={e => handleNav(e, href)}
                     className="font-sans text-sm text-ivory/40 hover:text-ivory transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">Documenti</h4>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="font-sans text-xs text-ivory/25 hover:text-ivory/60 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact quick */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">Contatti</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+393923704212"
                   className="font-sans text-sm text-ivory/40 hover:text-champagne transition-colors">
                  +39 392 3704212
                </a>
              </li>
              <li>
                <a href="mailto:info@b12fitness.it"
                   className="font-sans text-sm text-ivory/40 hover:text-champagne transition-colors">
                  info@b12fitness.it
                </a>
              </li>
              <li className="font-sans text-xs text-ivory/25 leading-relaxed">
                Via Tangenziale 3<br />Peschiera del Garda (VR)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* System status indicator */}
          <div className="flex items-center gap-3">
            <span className="pulse-dot" />
            <span className="font-mono text-[11px] text-ivory/25 tracking-widest">
              SISTEMA OPERATIVO — b12fitness.it
            </span>
          </div>

          <p className="font-mono text-[11px] text-ivory/20 text-center md:text-right">
            © {new Date().getFullYear()} b12 Fitness S.r.l. — Tutti i diritti riservati.
          </p>

        </div>
      </div>
    </footer>
  )
}
