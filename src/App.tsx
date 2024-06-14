import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import Loading from './components/loading/Loading';
import CustomProvider from './components/CustomProvider';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Main = lazy(() => import('./components/main/Main'));

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
    if (mainInView) {
      mainControl.start("visible");
    } else {
      mainControl.start("hidden");
    }
  }, [mainControl, mainInView]);

  useEffect(() => {
    if (heroInView) {
      heroControl.start("visible");
    } else {
      heroControl.start("hidden");
    }
  }, [heroControl, heroInView]);

  useEffect(() => {
    if (contactInView) {
      contactControl.start("visible");
    } else {
      contactControl.start("hidden");
    }
  }, [contactControl, contactInView]);

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
            initial="hidden"
            animate={mainControl}>
            <Main mainInView={mainInView} />
          </motion.div>

          <div id='contact-us' className='divider' />
          <motion.div
            ref={contactRef}
            variants={appearingAnimation}
            initial="hidden"
            animate={contactControl}
          >
            <Contact />
          </motion.div>

          <div className='divider' />
          <Footer />

          <button
            style={{ opacity: scrollVisible ? 1 : 0, transition: "opacity 0.5s, transform 0.3s" }}
            onClick={scrollToTop}
            className='scroll-to-up'
          >
            <i className='icon-keyboard_arrow_up' />
          </button>

          <Sidebar />
        </div>
      </CustomProvider>
    </Suspense>
  );
}

export default App;