import { useLang } from '../context/LanguageContext'
import T from '../translations'

const handleNav = (e, href) => {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { lang } = useLang()
  const t = T[lang].footer

  return (
    <footer className="bg-[#070a07] rounded-t-6xl mt-0 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16 pb-16 border-b border-white/5">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <a href="#hero" onClick={e => handleNav(e, '#hero')}
               className="block hover:opacity-80 transition-opacity w-fit">
              <img src="/logo.png" alt="b12 fitness"
                   className="h-14 w-auto object-contain"
                   style={{ filter: 'drop-shadow(0 0 6px rgba(34,230,0,0.2))' }} />
            </a>
            <p className="font-sans text-sm text-ivory/35 leading-relaxed max-w-[220px]">
              {t.tagline}
            </p>
            <p className="font-mono text-xs text-ivory/20">P.IVA 04449260233</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">{t.navLabel}</h4>
            <ul className="flex flex-col gap-3">
              {t.navLinks.map(({ label, href }) => (
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
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">{t.legalLabel}</h4>
            <ul className="flex flex-col gap-3">
              {t.legalLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="font-sans text-xs text-ivory/25 hover:text-ivory/60 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ivory/25">{t.contactLabel}</h4>
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="pulse-dot" />
            <span className="font-mono text-[11px] text-ivory/25 tracking-widest">{t.status}</span>
          </div>
          <p className="font-mono text-[11px] text-ivory/20 text-center md:text-right">{t.copy}</p>
        </div>

      </div>
    </footer>
  )
}
