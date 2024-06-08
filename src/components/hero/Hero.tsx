import './hero.css';
import Lottie from 'lottie-react';
import devAnimationDark from '../../../public/animation/yoga_man_dark.json';
import devAnimationLight from '../../../public/animation/yoga_man_light.json';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../context/ThemeContext';

export default function Hero() {
  const [text, setText] = useState('');
  const sentences = ["Full Stack Developer"];
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
        }, 150);
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 150);

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

  // const [copySuccess, setCopySuccess] = useState('');

  // const handleCopyEmail = () => {
  //   navigator.clipboard.writeText('mohamed.alaa.elhefny@gmail.com').then(() => {
  //     setCopySuccess('Email copied!');
  //     setTimeout(() => setCopySuccess(''), 2000);
  //   }).catch(() => {
  //     setCopySuccess('Failed to copy email');
  //     setTimeout(() => setCopySuccess(''), 2000);
  //   });
  // };

  const hoverVariants = {
    // hover: { scale: 1.1, rotate: -45 }
  };

  return (
    <div>
      <section className='hero flex'>
        <div className='left-section'>
          <div className='parent-avatar flex'>
            <motion.img
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ damping: 5, duration: 2, type: "spring", stiffness: 100 }}
              src="./profile-pic.png" className='avatar' alt="" />
            <div className='icon-verified'></div>
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
            Hello, I'm Mohamed Alaa, a skilled Full Stack Developer proficient in a wide range of technologies including JavaScript, Typescript, React.js, Redux, Next.js, Angular, MVC, SQL Server, .Net, C#, Node.js, AWS, CSS3, Sass, Tailwind, Bootstrap, Material UI, Angular Material, Chakra UI, and HTML5, with more than year of experience as a JavaScript Developer. I bring a solid foundation in web development and a proven track record of delivering high-quality solutions.
          </motion.p>

          <div className='social-section'>
            <div className='all-icons flex'>
              <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon icon-envelope" />
              <a href='https://github.com/MohamedAlaa18' target="_blank" className="icon icon-github" />
              <a href='https://wa.me/+201289643240' target="_blank" className="icon icon-whatsapp" />
              <a href='https://www.linkedin.com/in/mohamed-alaa-elhefny' target="_blank" className="icon icon-linkedin" />
            </div>

            {/* <div className='flex social-bottom'> */}
            <motion.a
              href="https://mohamed-alaa-dev.vercel.app/Mohamed Alaa El-hefny.pdf"
              className="download-cv flex"
              download="Mohamed Alaa El-hefny.pdf"
              whileHover="hover"
            >
              Download CV &nbsp;
              <motion.i
                className="icon-file_download"
                variants={hoverVariants}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* <div className="copy-email-container">
                <motion.button
                  onClick={handleCopyEmail}
                  className="copy-email flex"
                  whileHover="hover"
                >
                  Copy Email &nbsp;
                  <motion.i
                    className='icon-copy'
                    variants={hoverVariants}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                {copySuccess && <span className="copy-success-message">{copySuccess}</span>}
              </div> */}
            {/* </div> */}

          </div>
        </div>

        <div className='right-section animation'>
          <Lottie animationData={isDark ? devAnimationDark : devAnimationLight} />
        </div>
      </section>
    </div>
  );
}
