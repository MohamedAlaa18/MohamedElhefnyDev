import { useEffect, useState, lazy, Suspense } from 'react'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { ViewProvider } from './context/ViewContext'
import Sidebar from './components/sidebar/Sidebar'
import { ThemeProvider } from './context/ThemeContext'
import { Provider } from 'react-redux'
import store from './state/store'
import Loading from './components/loading/Loading'
const Main = lazy(() => import('./components/main/Main'))

function App() {
  const [scrollVisible, setScrollVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
    })
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <ViewProvider>
          <ThemeProvider>
            <div className='container'>
              <div id='about' />
              <Header />
              <Hero />
              <div id='main' className='divider' />
              <Main />
              <div id='contact-us' className='divider' />
              <Contact />
              <div className='divider' />
              <Footer />

              <a style={{ opacity: scrollVisible ? 1 : 0, transition: "1s" }} href="#about" className='scroll-to-up'>
                <i className='icon-keyboard_arrow_up' />
              </a>

              <Sidebar />
            </div>
          </ThemeProvider>
        </ViewProvider>
      </Provider>
    </Suspense>
  )
}

export default App