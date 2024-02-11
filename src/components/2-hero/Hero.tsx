import './hero.css'

function Hero() {
  return (
    <section className='hero flex'>
      <div className='left-section'>
        <div className='parent-avatar flex'>
          <img src="./me.png" className='avatar' alt="" />
          <div className='icon-verified'></div>
        </div>
        <h1 className='title'>Frontend Developer</h1>
        <p className='sub-title'>Hello, I'm Mohamed Alaa, a Front-End Developer trained in JavaScript, Typescript,
          React.js, Redux, NextJs, CSS, Sass, Tailwind, Bootstrap, Chakra UI, HTML, SQL,Node.js, and AWS and
          I have a year of expertise as a JavaScript Developer.
        </p>
        <div className='all-icons flex'>
          <div className="icon icon-twitter"></div>
          <div className="icon icon-instagram"></div>
          <div className="icon icon-github"></div>
          <div className="icon icon-linkedin"></div>
        </div>
      </div>
      <div className='right-section animation'>

      </div>
    </section>
  )
}

export default Hero