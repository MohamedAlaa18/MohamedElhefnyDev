import { useState } from 'react'
import './projects.css'
import { myProjects } from './myProjects'
import { AnimatePresence, motion } from "framer-motion"

function Projects() {
  const [active, setActive] = useState('all');
  const [projectsFiltered, setProjectsFiltered] = useState(myProjects);

  const handelClick = (category: string) => {
    setActive(category);
    category == 'all' ?
      setProjectsFiltered(myProjects)
      :
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
    <section id='projects' className='flex'>
      <div className='flex left-section'>
        <button className={active == 'all' ? 'active' : ''} onClick={() => { handelClick('all') }}>All Projects</button>
        <button className={active == 'next' ? 'active' : ''} onClick={() => { handelClick('next') }}>Next </button>
        <button className={active == 'react' ? 'active' : ''} onClick={() => { handelClick('react') }}>React</button>
        <button className={active == 'redux' ? 'active' : ''} onClick={() => { handelClick('redux') }}>Redux </button>
        {/* <button className={active == 'tailwind' ? 'active' : ''} onClick={() => { handelClick('tailwind') }}>Tailwind CSS </button>
        <button className={active == 'mui' ? 'active' : ''} onClick={() => { handelClick('mui') }}>Material UI </button>
        <button className={active == 'sass' ? 'active' : ''} onClick={() => { handelClick('sass') }}>Sass </button> */}
      </div>

      <div className='flex right-section'>
        <AnimatePresence>
          {projectsFiltered.map((project) => (

            <motion.article
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              exit={{ transform: "scale(1)" }}
              transition={{ damping: 8, type: "spring", stiffness: 40 }}
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

                  <a className='link flex' target='_blank' href={project.demo}>
                    more
                    <div className='icon-arrow-right'></div>
                  </a>
                </div>
              </div>

            </motion.article>

          ))}
        </AnimatePresence>
      </div>
    </section >
  )
}

export default Projects