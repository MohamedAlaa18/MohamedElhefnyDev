import { useState } from 'react'
import './main.css'
import { myProjects } from './myProjects'
import { AnimatePresence, motion } from "framer-motion"

function Main() {
  const [active, setActive] = useState('all');
  const [projectsFiltered, setProjectsFiltered] = useState(myProjects);

  const handelClick = (category: string) => {
    setActive(category);
    category == 'all' ?
      setProjectsFiltered(myProjects)
      :
      // setProjectsFiltered(
      //   myProjects.filter(
      //     (project) => ((project.category).filter((pCategory) => pCategory == category))
      //   )
      // );
      setProjectsFiltered(
        myProjects.filter(
          (project) => {
            const specificCategory = (project.category).find((pCategory) => pCategory == category);
            return specificCategory == category;
          }
        )
      );
  }
  return (
    <main className='flex'>
      <section className='flex left-section'>

        <button className={active == 'all' ? 'active' : ''} onClick={() => { handelClick('all') }}>All Projects</button>
        {/* <button className={active == 'javaScript' ? 'active' : ''} onClick={() => { handelClick('javaScript') }}>JavaScript</button> */}
        {/* <button className={active == 'typeScript' ? 'active' : ''} onClick={() => { handelClick('typeScript') }}>TypeScript</button> */}
        <button className={active == 'react' ? 'active' : ''} onClick={() => { handelClick('react') }}>React </button>
        <button className={active == 'redux' ? 'active' : ''} onClick={() => { handelClick('redux') }}>Redux </button>
        <button className={active == 'nextJs' ? 'active' : ''} onClick={() => { handelClick('nextJs') }}>NextJs </button>
        {/* <button className={active == 'sass' ? 'active' : ''} onClick={() => { handelClick('sass') }}>Sass </button> */}
        {/* <button className={active == 'tailwind' ? 'active' : ''} onClick={() => { handelClick('tailwind') }}>Tailwind </button> */}
        {/* <button className={active == 'chakraUi' ? 'active' : ''} onClick={() => { handelClick('chakraUi') }}>ChakraUi </button> */}
        <button className={active == 'firebase' ? 'active' : ''} onClick={() => { handelClick('firebase') }}>Firebase </button>
      </section>
      <section className='flex right-section'>
        <AnimatePresence>
          {projectsFiltered.map((project) => (

            <motion.article
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              exit={{ transform: "scale(1)" }}
              transition={{ damping: 8, type: "spring", stiffness: 50 }}
              key={project.imagPath} className='card'>

              <img width={266} src={project.imagPath} alt="little-lemon" />

              <div style={{ width: "266px" }} className='box'>
                <h1 className='title'>{project.projectTitle}</h1>
                <p className='sub-title'>{project.projectDescription}</p>

                <div className="flex icons">

                  <div className='flex '>
                    <a className="icon-link" target="_blank" href={project.demo}></a>
                    <a className="icon-github" target="_blank" href={project.source}></a>
                  </div>

                  <a className='link flex'>
                    more
                    <div className='icon-arrow-right'></div>
                  </a>
                </div>
              </div>

            </motion.article>

          ))}
        </AnimatePresence>
      </section>
    </main >
  )
}

export default Main