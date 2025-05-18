import './hero.css';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import devAnimationDark from '../../../public/animation/laptop_2_blue_1.json';
import devAnimationLight from '../../../public/animation/laptop_2_orange.json';
import { motion, AnimatePresence } from "framer-motion";
import ResumeButton from '../resumeButton/ResumeButton';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

export default function Hero() {
  const [text, setText] = useState('');
  const sentences = ["Front End Developer"];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  // const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (letterIndex < sentences[sentenceIndex].length) {
        setText((prevText) => prevText + sentences[sentenceIndex][letterIndex]);
        setLetterIndex((prevLetterIndex) => prevLetterIndex + 1);
      } else if (sentenceIndex < sentences.length - 1) {
        setTimeout(() => {
          setSentenceIndex((prevSentenceIndex) => prevSentenceIndex + 1);
          setLetterIndex(0);
          setIsTypingComplete(false);
        }, 200);
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 200);

    return () => clearInterval(typingInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterIndex, sentenceIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const targetPath = "M 351.343 0 C 351.343 0 351.343 0 351.343 0 C 351.343 39.7368 319.08 72 279.343 72 C 279.343 72 -279.343 72 -279.343 72 C -319.08 72 -351.343 39.7368 -351.343 0 C -351.343 0 -351.343 0 -351.343 0 C -351.343 -39.7368 -319.08 -72 -279.343 -72 C -279.343 -72 279.343 -72 279.343 -72 C 319.08 -72 351.343 -39.7368 351.343 0 Z";

    const checkPathAttribute = () => {
      const svgs = document.querySelectorAll('svg');

      svgs.forEach(svg => {
        const paths = svg.querySelectorAll('path');

        paths.forEach(path => {
          const dAttribute = path.getAttribute('d');

          if (dAttribute === targetPath) {
            svg.classList.add('display-block');
          }
        });
      });
    };

    // Run after mount
    checkPathAttribute();
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section className='hero flex'>
      <div className='left-section'>
        <motion.div
          className='parent-avatar flex'
          initial={{ scale: 1, x: 0 }}
        // animate={{
        //   scale: scrollY < 200 ? 1 - scrollY / 800 : 0.75,
        //   x: scrollY < 200 ? -scrollY / 10 : -20,
        //   y: scrollY < 200 ? scrollY / 10 : 20,
        //   width: "150px",
        //   zIndex: 1,
        // }}
        >
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            transition={{ damping: 5, duration: 2, type: "spring", stiffness: 100 }}
            src="./images/me_carton.png"
            className='avatar'
            alt=""
          />
          <i className='icon-verified' />
        </motion.div>
        <div className='flex header-section'>
          <motion.h1
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='title'>
            {isTypingComplete ? sentences.join(" ") : text}
            <AnimatePresence>
              {showCursor && !isTypingComplete && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  |
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="sub-title">
          I am Mohamed El Hefny, a front-end developer who loves building dynamic, high-performance web applications.
          I excel at Angular, React, and Next.js for creating seamless and interactive user experiences.
          I have done a great job in creating scalable solutions to meet business and user requirements.
          My skills cover modern front-end technologies that make the applications efficient and engaging
          I seek to build effective and beneficial solutions with a lot of efficiency.
        </motion.p>

        <div className='social-section'>
          <div className='all-icons flex'>
            <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon"><i className="icon-envelope" /></a>
            <a href='https://github.com/MohamedEl-Hefny' target="_blank" className="icon" ><i className="icon-github" /></a>
            <a href='https://wa.me/+201289643240' target="_blank" className="icon" ><i className="icon-whatsapp" /></a>
            <a href='https://www.linkedin.com/in/mohamed-alaa-elhefny' target="_blank" className="icon" ><i className="icon-linkedin" /></a>
            <ResumeButton />
            {/* <a className="icon icon-files" onClick={handleViewCv} /> */}
            {/* <a href="./public/Mohamed Alaa El-hefny.pdf" className="icon icon-download" download /> */}
          </div>

          {/* <div className='cv-section flex'>
            <motion.a
              href="./public/Mohamed Alaa El-hefny.pdf"
              className="download-cv flex"
              whileHover="hover"
              download
            >
              Download CV &nbsp; <i className="icon-download" />
            </motion.a> */}
        </div>
      </div>

      <div className='right-section animation'>
        <Lottie animationData={isDark ? devAnimationDark : devAnimationLight} style={{ height: 455 }} />
      </div>
      {/* {isModalOpen && (
        <Modal>
          <iframe
            src="/public/Mohamed Alaa El-hefny.pdf"
            width="100%"
            height="100%"
            title="CV"
            style={{ border: "none" }}
          />
        </Modal>
      )} */}
    </section>
  );
}
