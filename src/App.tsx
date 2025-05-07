import { useEffect, useState, lazy, Suspense, FC } from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import Loading from './components/loading/Loading';
import CustomProvider from './components/CustomProvider';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParticlesBackground from './components/particlesBackground/ParticlesBackground';

export interface MainProps {
  mainAnimated: boolean;
}

const Main = lazy(() =>
  new Promise<{ default: FC<MainProps> }>((resolve) => {
    setTimeout(() => {
      import('./components/main/Main').then((module) => {
        resolve({ default: module.default });
      });
    }, 2666);
  })
);

const appearingAnimation = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  hidden: { opacity: 0, scale: 0.7 },
};

function App() {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [mainRef, mainInView] = useInView({ threshold: 0.2, rootMargin: '-50px' });
  const [heroRef, heroInView] = useInView({ threshold: 0.2, rootMargin: '-50px' });
  const [contactRef, contactInView] = useInView({ threshold: 0.2, rootMargin: '-50px' });

  const mainControl = useAnimation();
  const heroControl = useAnimation();
  const contactControl = useAnimation();

  const [mainAnimated, setMainAnimated] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [contactAnimated, setContactAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mainInView && !mainAnimated) {
      mainControl.start("visible");
      setMainAnimated(true);
    }
  }, [mainControl, mainInView, mainAnimated]);

  useEffect(() => {
    if (heroInView && !heroAnimated) {
      heroControl.start("visible");
      setHeroAnimated(true);
    }
  }, [heroControl, heroInView, heroAnimated]);

  useEffect(() => {
    if (contactInView && !contactAnimated) {
      contactControl.start("visible");
      setContactAnimated(true);
    }
  }, [contactControl, contactInView, contactAnimated]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <CustomProvider>
        <div className='container relative'>
          <div id='about' />
          <Header />

          <motion.div
            ref={heroRef}
            variants={appearingAnimation}
            initial="hidden"
            animate={heroControl}
          >
            <Hero />
          </motion.div>

          <div id='main' className='divider' />
          <motion.div
            ref={mainRef}
            variants={appearingAnimation}
            // initial="hidden"
            animate={mainControl}
          >
            <Main mainAnimated={mainAnimated} />
          </motion.div>

          <div id='contact-us' className='divider' />
          <motion.div
            ref={contactRef}
            variants={appearingAnimation}
            // initial="hidden"
            animate={contactControl}
          >
            <Contact />
          </motion.div>

          <div className='divider' />
          <Footer />
          <ParticlesBackground />
        </div>
        <button
          style={{ opacity: scrollVisible ? 1 : 0 }}
          onClick={scrollToTop}
          className='scroll-to-up'
        >
          <i className='icon-keyboard_arrow_up' />
        </button>
        <Sidebar />
      </CustomProvider>
    </Suspense>
  );
}

export default App;
