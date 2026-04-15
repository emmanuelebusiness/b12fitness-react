import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Numero WhatsApp — sostituire con il numero reale (solo cifre, con prefisso paese)
const WHATSAPP_NUMBER = '393923704212'
const WHATSAPP_MSG    = encodeURIComponent('Ciao! Vorrei prenotare una prova gratuita in palestra.')
const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const INFO = [
  {
    Icon: MapPin,
    label: 'Indirizzo',
    value: 'Via Tangenziale 3, Peschiera del Garda (VR)',
  },
  {
    Icon: Phone,
    label: 'Telefono',
    value: '+39 392 3704212',
    href: 'tel:+393923704212',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'info@b12fitness.it',
    href: 'mailto:info@b12fitness.it',
  },
  {
    Icon: Clock,
    label: 'Orari',
    lines: [
      'Lun – Ven: 07:00 – 21:00',
      'Sabato: 09:00 – 17:00',
      'Domenica: 09:00 – 13:00',
    ],
  },
]

export default function Contatti() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-header', start: 'top 85%' },
      })
      gsap.from('.contact-info-item', {
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.contact-info', start: 'top 80%' },
      })
      gsap.from('.contact-wa-wrap', {
        x: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-wa-wrap', start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contatti" ref={ref}
             className="bg-obsidian py-24 md:py-36 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="contact-header mb-16">
          <span className="section-label block mb-3">Vieni a Trovarci</span>
          <h2 className="font-sans font-black text-[clamp(2rem,4vw,3.5rem)] text-ivory leading-tight tracking-tight">
            b12 Fitness — la tua palestra sul Lago di Garda.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ---- Info ---- */}
          <div className="contact-info flex flex-col gap-8">
            {INFO.map(({ Icon, label, value, href, lines }) => (
              <div key={label} className="contact-info-item flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-champagne/10 border border-champagne/20
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-champagne" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ivory/30 mb-1">
                    {label}
                  </p>
                  {lines ? (
                    <div className="flex flex-col gap-0.5">
                      {lines.map(l => (
                        <p key={l} className="font-sans text-sm text-ivory/70">{l}</p>
                      ))}
                    </div>
                  ) : href ? (
                    <a href={href} className="font-sans text-sm text-ivory hover:text-champagne transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-sans text-sm text-ivory/70">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="contact-info-item flex gap-3 pt-4 border-t border-white/5">
              {[
                { label: 'Facebook',  href: 'https://www.facebook.com/b12fitnesscenter/' },
                { label: 'Instagram', href: 'https://www.instagram.com/b12fitclub/' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center
                              text-ivory/40 hover:text-champagne hover:border-champagne/30
                              transition-all duration-200"
                   aria-label={label}>
                  {label === 'Instagram'
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                        <rect x="2" y="2" width="20" height="20" rx="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                      </svg>
                    : <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                  }
                </a>
              ))}
            </div>
          </div>

          {/* ---- WhatsApp CTA ---- */}
          <div className="contact-wa-wrap card-surface p-8 md:p-10 flex flex-col items-center justify-center gap-8 text-center min-h-[320px]">

            {/* WhatsApp icon */}
            <div className="w-20 h-20 rounded-full bg-champagne/10 border border-champagne/20
                            flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-champagne">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
                         -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
                         -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
                         -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
                         .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
                         -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
                         -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
                         -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
                         .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
                         .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
                         .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.522 5.854L0 24l6.338-1.498
                         A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818
                         a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.98.997-3.648-.235-.374
                         A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182
                         S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
                         -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
                         -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
                         -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
                         .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
                         -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
                         -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
                         -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
                         .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
                         .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
                         .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.522 5.854L0 24l6.338-1.498
                         A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818
                         a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.98.997-3.648-.235-.374
                         A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182
                         S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
              </svg>
              Scrivici su WhatsApp
            </a>


          </div>

        </div>
      </div>
    </section>
  )
}
