import './hero.css';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Lottie from 'lottie-react';
import devAnimationDark from '../../../public/animation/laptop_2_blue_1.json';
import devAnimationLight from '../../../public/animation/laptop_2_orange.json';
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [text, setText] = useState('');
  const sentences = ["Front End Developer"];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
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

  document.addEventListener("DOMContentLoaded", () => {
    const targetPath = "M 351.343 0 C 351.343 0 351.343 0 351.343 0 C 351.343 39.7368 319.08 72 279.343 72 C 279.343 72 -279.343 72 -279.343 72 C -319.08 72 -351.343 39.7368 -351.343 0 C -351.343 0 -351.343 0 -351.343 0 C -351.343 -39.7368 -319.08 -72 -279.343 -72 C -279.343 -72 279.343 -72 279.343 -72 C 319.08 -72 351.343 -39.7368 351.343 0 Z";

    // Function to check d attribute and apply the display-block class
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

    checkPathAttribute();
  });

  return (
    <section className='hero flex'>
      <div className='left-section'>
        <div className='parent-avatar flex'>
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            transition={{ damping: 5, duration: 2, type: "spring", stiffness: 100 }}
            src="./profile-pic-new.png" className='avatar' alt="" />
          <div className='icon-verified'><div></div></div>
        </div>
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
            <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon icon-envelope" />
            <a href='https://github.com/MohamedAlaa18' target="_blank" className="icon icon-github" />
            <a href='https://wa.me/+201289643240' target="_blank" className="icon icon-whatsapp" />
            <a href='https://www.linkedin.com/in/mohamed-alaa-elhefny' target="_blank" className="icon icon-linkedin" />
          </div>

          <motion.a
            href="https://mohamed-alaa-dev.vercel.app/Mohamed Alaa El-hefny.pdf"
            className="download-cv flex"
            download="Mohamed Alaa El-hefny.pdf"
            whileHover="hover"
          >
            Download CV &nbsp;
            <i className="icon-file_download" />
          </motion.a>
        </div>
      </div>

      <div className='right-section animation'>
        <Lottie animationData={isDark ? devAnimationDark : devAnimationLight} style={{ height: 455 }} />
      </div>
    </section>
  );
}
