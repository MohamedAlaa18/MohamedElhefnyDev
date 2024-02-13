import './hero.css'
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import devAnimation from '../../animation/dev.json'
import { useRef } from 'react';
import { motion } from "framer-motion"
// import devAnimation2 from '../../../public/CV.pdf'
function Hero() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <section className='hero flex'>
      <div className='left-section'>
        <div className='parent-avatar flex'>
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            transition={{ damping: 5, duration: 2, type: "spring", stiffness: 100 }}
            src="./me.png" className='avatar' alt="" />
          <div className='icon-verified'></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='title'>Frontend Developer
        </motion.h1>
        <p className='sub-title'>Hello, I'm Mohamed Alaa, a Front-End Developer trained in JavaScript, Typescript,
          React.js, Redux, Next.js, CSS, Sass, Tailwind, Bootstrap, Chakra Ui, HTML, SQL Server,Node.js, and AWS and
          I have a year of expertise as a JavaScript Developer.
        </p>
        <div className='all-icons flex'>
          <div className="icon icon-twitter"></div>
          <div className="icon icon-envelope"></div>
          {/* <div className="icon icon-instagram"></div> */}
          <div className="icon icon-github"></div>
          <div className="icon icon-linkedin"></div>
        </div>
        <a href="../../../public/CV.pdf" className="download-cv flex" download="CV">
          Download CV <div className="icon-file_download"></div>
        </a>
      </div>
      <div className='right-section animation'>
        <Lottie animationData={devAnimation}
          //https://lottiereact.com/
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current?.setSpeed(0.5)
          }} />
      </div>
    </section>
  )
}

export default Hero