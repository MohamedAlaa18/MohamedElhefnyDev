import { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Main from './components/main/Main'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { ViewProvider } from './components/viewContext/ViewContext'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  const [scrollVisible, setScrollVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
    })
  }, [])

  return (
    <ViewProvider>
      <div className='container'>
        <Header />
        <div id='about'></div>
        <Hero />
        <div id='main' className='divider' />
        <Main />
        <div id='contact-us' className='divider' />
        <Contact />
        <div className='divider' />
        <Footer />

        <a style={{ opacity: scrollVisible ? 1 : 0, transition: "1s" }} href="#about">
          <button className='icon-keyboard_arrow_up scroll-to-up' />
        </a>

        <Sidebar />
      </div>
    </ViewProvider>
  )
}

export default App