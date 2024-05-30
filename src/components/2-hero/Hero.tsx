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
            src="./me.jpg" className='avatar' alt="" />
          <div className='icon-verified'></div>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='title'>
          Front End Developer | Full Stack Developer (React.js | Angular | .Net Core)
        </motion.h1>
        <p className='sub-title'>
          Hello, I'm Mohamed Alaa, a skilled Full Stack Developer proficient in a wide range of technologies including JavaScript, Typescript, React.js, Redux, Next.js, Angular, MVC, SQL Server, .Net, C#, Node.js, AWS, CSS3, Sass, Tailwind, Bootstrap, Material UI, Angular Material, Chakra UI, and HTML5. With one year of experience as a JavaScript Developer
        </p>
        <div className='all-icons flex'>
          <a href='mailto: mohamed.alaa.elhefny@gmail.com' target="_blank" className="icon icon-envelope"></a>
          <a href='#' className="icon icon-stack-overflow"></a>
          <a href='https://github.com/MohamedAlaa18' target="_blank" className="icon icon-github"></a>
          <a href='https://www.linkedin.com/in/mohamed-alaa-elhefny' target="_blank" className="icon icon-linkedin"></a>
        </div>
        <a href="https://mohamed-alaa-dev.vercel.app/Mohamed Alaa El-hefny.pdf" className="download-cv flex" download="Mohamed Alaa El-hefny.pdf">
          Download CV <div className="icon-file_download"></div>
        </a>
      </div>
      <div className='right-section animation'>
        <Lottie animationData={devAnimation}
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current?.setSpeed(0.5)
          }} />
        {/* <div className="shape-container">
          <div className="shape"></div>
        </div> */}
      </div>
    </section>
  )
}

export default Hero