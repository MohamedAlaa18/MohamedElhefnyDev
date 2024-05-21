import { useState, useEffect, useRef, MouseEvent } from 'react';
import './projects.css';
import { myProjects, ProjectType } from './myProjects';
import { AnimatePresence, motion } from "framer-motion";
import Modal from '../modal/Modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type DescriptionPosition = 'right' | 'left' | 'bottom';

function Projects() {
  const [active, setActive] = useState<string>('all');
  const [projectsFiltered, setProjectsFiltered] = useState<ProjectType[]>(myProjects);
  const [, setShowDescription] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [descriptionPosition, setDescriptionPosition] = useState<DescriptionPosition>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const handleClick = (category: string) => {
    setActive(category);

    if (category === 'all') {
      setProjectsFiltered(myProjects);
    } else {
      setProjectsFiltered(
        myProjects.filter((project) => project.category.includes(category))
      );
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Check if description will overflow viewport
    if (rect.right + 266 > viewportWidth) {
      setDescriptionPosition('left');
    } else {
      setDescriptionPosition('right');
    }

    const cards = document.querySelectorAll('.card-container');
    cards.forEach((otherCard) => {
      if (otherCard !== target) {
        otherCard.classList.add('motion-article-blur');
      }
    });

    // Find the index of the hovered card within the projectsFiltered array
    const filteredIndex = Array.from(containerRef.current!.children[1].children).indexOf(target);

    setHoveredIndex(filteredIndex);
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    const cards = document.querySelectorAll('.card-container');
    cards.forEach((otherCard) => {
      otherCard.classList.remove('motion-article-blur');
    });
    setHoveredIndex(-1);
    setShowDescription(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
  };

  const handleImageClick = (project: ProjectType) => {
    const projectScreenshots = Array.from({ length: project.screenShots['length'] }, (_, i) => `${project.screenShots['path']}/Screenshot (${i + 1}).png`);
    setScreenshots(projectScreenshots);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.card-container');

    cards.forEach((card) => {
      card.addEventListener('mouseenter', (event) => handleMouseEnter(event as unknown as MouseEvent<HTMLDivElement>));
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) {
        if (event.key === 'ArrowRight') {
          handleNext();
        } else if (event.key === 'ArrowLeft') {
          handlePrev();
        } else if (event.key === 'Escape') {
          handleCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listeners
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter as unknown as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsFiltered, isModalOpen]);

  return (
    <section id='projects' className='flex' ref={containerRef}>
      <div className='flex left-section'>
        <button className={active === 'all' ? 'active' : ''} onClick={() => { handleClick('all'); }}>All Projects</button>
        <button className={active === 'next' ? 'active' : ''} onClick={() => { handleClick('next'); }}>Next</button>
        <button className={active === 'react' ? 'active' : ''} onClick={() => { handleClick('react'); }}>React</button>
        <button className={active === 'angular' ? 'active' : ''} onClick={() => { handleClick('angular'); }}>Angular</button>
        <button className={active === 'javaScript' ? 'active' : ''} onClick={() => { handleClick('javaScript'); }}>JavaScript</button>
      </div>

      <div className='flex right-section'>
        <AnimatePresence>
          {projectsFiltered.map((project, index) => (
            <div className='card-container' key={project.imagPath}
              onMouseEnter={(event) => handleMouseEnter(event as unknown as MouseEvent<HTMLDivElement>)}
              onMouseLeave={handleMouseLeave}>
              <motion.article
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                exit={{ transform: "scale(1)" }}
                transition={{ damping: 8, type: "spring", stiffness: 40 }}
                className='card'
              >
                <div className="image-container">
                  <img className="image" width={266} src={project.imagPath} alt={project.projectTitle} />
                  <div className="overlay" onClick={() => handleImageClick(project)}>
                    <div className="icon-picture"></div>
                  </div>
                </div>
                <div style={{ width: "266px" }} className='box'>
                  <h1 className='title'>{project.projectTitle}</h1>
                  <p className='sub-title'>{project.projectDescription}</p>
                  <div className="flex icons">
                    <div className='flex'>
                      <a className="icon-link" target="_blank" href={project.demo} rel="noopener noreferrer"></a>
                      <a className="icon-github" target="_blank" href={project.source} rel="noopener noreferrer"></a>
                    </div>
                    <button className='icon-airplay link flex'
                      rel="noopener"
                    >
                    </button>
                  </div>
                </div>
              </motion.article>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`card-description-container visible ${descriptionPosition === 'right' ? 'right' : 'left'}`}
                  >
                    <div className='card-description'>
                      <h1 className='title'>{project.projectTitle}</h1>
                      <div className="book-mark">
                        <div id="triangle-topleft"></div>
                        <div id="triangle-topright"></div>
                      </div>
                      <p className='sub-title'>{project.projectDescription}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
          totalImages={screenshots.length}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        >
          {
            screenshots.length > 0 ?
              <LazyLoadImage
                src={screenshots[currentImageIndex]}
                alt={`Screenshot ${currentImageIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                // loading='lazy'
                // effect='blur'
              />
              :
              <>
                <img src="/images/See_you_soon_dark.gif" alt="" className='not-found-dark' />
                <img src="/images/See_you_soon_light.gif" alt="" className='not-found-light' />
              </>
          }
        </Modal>
      )}
    </section>

  );
}

export default Projects;
