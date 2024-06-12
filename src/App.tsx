import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import Loading from './components/loading/Loading';
import CustomProvider from './components/CustomProvider';

const Main = lazy(() => import('./components/main/Main'));

function App() {
  const [scrollVisible, setScrollVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <CustomProvider>
        <div className='container relative'>
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
      </CustomProvider>
    </Suspense>
  );
}

export default App;
