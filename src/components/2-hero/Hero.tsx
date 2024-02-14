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
          React.js, Redux, Next.js, CSS, Sass, Tailwind, Bootstrap, Chakra Ui, HTML, SQL Server,Node.js and AWS and
          I have a year of expertise as a JavaScript Developer.
        </p>
        <div className='all-icons flex'>
          <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon icon-envelope"></a>
          <a href='https://stackoverflow.com/users/20994901/mohamed-alaa' target="_blank" className="icon icon-stack-overflow"></a>
          <a href='https://github.com/MohamedAlaa28' target="_blank" className="icon icon-github"></a>
          <a href='https://www.linkedin.com/in/mohamed-alaa-b180625' target="_blank" className="icon icon-linkedin"></a>
        </div>
        <a href="https://mohamedalaadev-5c497.web.app/CV.pdf" className="download-cv flex" download="CV.pdf">
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