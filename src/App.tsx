import { useEffect, useState } from 'react'
import Header from './components/1-header/Header'
import Hero from './components/2-hero/Hero'
import Main from './components/3-main/Main'
import Contact from './components/4-contact/Contact'
import Footer from './components/5-footer/Footer'
import Certificates from './components/certificates/Certificates'

function App() {
  const [scrollVisible, setScrollVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
    })
  }, [])

  return (
    <div id="top" className='container'>
      <Header />
      <Hero />
      <div id='projects' className='divider' />
      <Main />
      <div id='certificates' className='divider' />
      <Certificates />
      <div id='contact-us' className='divider' />
      <Contact />
      <div className='divider' />
      <Footer />

      <a style={{ opacity: scrollVisible ? 1 : 0, transition: "1s" }} href="#top">
        <button className='icon-keyboard_arrow_up scroll-to-up' />
      </a>
    </div>
  )
}

export default App
