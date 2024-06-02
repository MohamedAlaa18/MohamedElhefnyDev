import './hero.css'
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import devAnimation from '../../animation/dev.json'
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

function Hero() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [text, setText] = useState('');
  const sentences = ["Full Stack Developer (React.js | Angular | .Net Core)"];
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  return (
    <section className='hero flex'>
      <div className='left-section'>
        <div className='parent-avatar flex'>
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            transition={{ damping: 5, duration: 2, type: "spring", stiffness: 100 }}
            src="./me.jpg" className='avatar' alt="" />
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
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          transition={{ duration: 1, delay: 0.5 }}
          className="sub-title">
          Hello, I'm Mohamed Alaa, a skilled Full Stack Developer proficient in a wide range of technologies including JavaScript, Typescript, React.js, Redux, Next.js, Angular, MVC, SQL Server, .Net, C#, Node.js, AWS, CSS3, Sass, Tailwind, Bootstrap, Material UI, Angular Material, Chakra UI, and HTML5, with more than year of experience as a JavaScript Developer. I bring a solid foundation in web development and a proven track record of delivering high-quality solutions.
        </motion.p>
        <div className='all-icons flex'>
          <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon icon-envelope"></a>
          <a href='#' className="icon icon-stack-overflow"></a>
          <a href='https://github.com/MohamedAlaa18' target="_blank" className="icon icon-github"></a>
          <a href='https://www.linkedin.com/in/mohamed-alaa-elhefny' target="_blank" className="icon icon-linkedin"></a>
        </div>
        <a href="https://mohamed-alaa-dev.vercel.app/Mohamed Alaa El-hefny.pdf" className="download-cv flex" download="Mohamed Alaa El-hefny.pdf">
          Download CV&nbsp;<div className="icon-file_download" />
        </a>
      </div>
      <div className='right-section animation'>
        <Lottie animationData={devAnimation}
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current?.setSpeed(0.5)
          }} />
      </div>
    </section>
  )
}

export default Hero;
