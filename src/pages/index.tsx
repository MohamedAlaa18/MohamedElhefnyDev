import Head from "next/head";
import { FC, useEffect, useState, lazy, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import Loading from "@/components/loading/Loading";
import CustomProvider from "@/components/CustomProvider";
import ParticlesBackground from "@/components/shared-components/particlesBackground/ParticlesBackground";

export interface MainProps {
  mainAnimated: boolean;
}

const Main = lazy(() =>
  new Promise<{ default: FC<MainProps> }>((resolve) => {
    setTimeout(() => {
      import("@/components/main/Main").then((module) => {
        resolve({ default: module.default });
      });
    }, 1333);
  })
);

const appearingAnimation = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  hidden: { opacity: 0, scale: 0.7 },
};

export default function Home() {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [mainRef, mainInView] = useInView({ threshold: 0.2, rootMargin: "-50px" });
  const [heroRef, heroInView] = useInView({ threshold: 0.2, rootMargin: "-50px" });
  const [contactRef, contactInView] = useInView({ threshold: 0.2, rootMargin: "-50px" });

  const mainControl = useAnimation();
  const heroControl = useAnimation();
  const contactControl = useAnimation();

  const [mainAnimated, setMainAnimated] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [contactAnimated, setContactAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollVisible(true);
      } else {
        setScrollVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="I am Mohamed El Hefny, a front-end developer who loves building dynamic, high-performance web applications.
        I excel at Angular, React, and Next.js for creating seamless and interactive user experiences.
        I have done a great job in creating scalable solutions to meet business and user requirements.
        My skills cover modern front-end technologies that make the applications efficient and engaging
        I seek to build effective and beneficial solutions with a lot of efficiency." />
        <meta name="keywords"
          content="HTML, CSS, JavaScript, React.js, React, Redux, Next.js, Angular , Next, CSS, Sass, Tailwind, Bootstrap, Chakra Ui, SQL Server, Node.js, AWS, Frontend, Frontend engineer , Frontend developer, Front-end, Front-end engineer, Front-end developer" />
        <meta name="author" content="Mohamed El Hefny" />
        <meta name="image" content="https://raw.githubusercontent.com/MohamedAlaa18/MohamedElhefnyDev/refs/heads/main/public/images/me_carton_noBorder.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Mohamed El Hefny | Portfolio" />
        <meta property="og:description"
          content="I'm Mohamed El Hefny, a front-end developer building high-performance web apps with Angular, React, and Next.js." />
        <meta property="og:image" content="https://raw.githubusercontent.com/MohamedAlaa18/MohamedElhefnyDev/refs/heads/main/public/images/me_carton_noBorder.png" />
        <meta property="og:url" content="https://mohamed-elhefny-dev.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mohamed El Hefny | Portfolio" />
        <meta name="twitter:description" content="Front-end developer with a passion for dynamic web experiences." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/MohamedAlaa18/MohamedElhefnyDev/refs/heads/main/public/images/me_carton_noBorder.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>Mohamed El Hefny | Portfolio</title>
      </Head>
      <Suspense fallback={<Loading />}>
        <CustomProvider>
          <div className="container relative">
            <div id="about" />
            <Header />

            <motion.div ref={heroRef} variants={appearingAnimation} initial="hidden" animate={heroControl}>
              <Hero />
            </motion.div>

            <div id="main" className="divider" />
            <motion.div ref={mainRef} variants={appearingAnimation} animate={mainControl}>
              <Main mainAnimated={mainAnimated} />
            </motion.div>

            <div id="contact-us" className="divider" />
            <motion.div ref={contactRef} variants={appearingAnimation} animate={contactControl}>
              <Contact />
            </motion.div>

            <div className="divider" />
            <Footer />
            <ParticlesBackground />
          </div>

          <button
            style={{ opacity: scrollVisible ? 1 : 0 }}
            onClick={scrollToTop}
            className="scroll-to-up"
          >
            <i className="icon-keyboard_arrow_up" />
          </button>

          <Sidebar />
        </CustomProvider>
      </Suspense>
    </>
  );
}