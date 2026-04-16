import { LanguageProvider } from './context/LanguageContext'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Features   from './components/Features'
import Filosofia  from './components/Filosofia'
import Protocollo from './components/Protocollo'
import Contatti   from './components/Contatti'
import Footer     from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Filosofia />
        <Protocollo />
        <Contatti />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
