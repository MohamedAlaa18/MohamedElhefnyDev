import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent } from 'react';
import './projects.css';
import { myProjects, ProjectType } from './myProjects';
import { AnimatePresence, motion } from "framer-motion";
import Modal from '../modal/Modal';
import { ringEffect, smoothScaleAnimation } from '../framer-animation';

type DescriptionPosition = 'right' | 'left' | 'bottom';

function Projects() {
  const [active, setActive] = useState<string>('All');
  const [isFeaturedFilter, setIsFeaturedFilter] = useState<boolean>(true);
  const [projectsFiltered, setProjectsFiltered] = useState<ProjectType[]>(myProjects);
  const [, setShowDescription] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [descriptionPosition, setDescriptionPosition] = useState<DescriptionPosition>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');


  const handleClick = (category: string) => {
    setActive(category);

    let filteredProjects = myProjects;

    if (category !== 'All') {
      filteredProjects = filteredProjects.filter((project) => project.category.includes(category));
    }

    setProjectsFiltered(filteredProjects);
  };

  const handleMouseEnter = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

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
    setLoading(true);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
    setLoading(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.card-container');

    cards.forEach((card) => {
      card.addEventListener('mouseenter', (event) => handleMouseEnter(event as unknown as ReactMouseEvent<HTMLDivElement>));
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

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter as unknown as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsFiltered, isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  const handleImageClick = (project: ProjectType) => {
    const projectScreenshots = Array.from({ length: project.screenShots['length'] }, (_, i) => `${project.screenShots['path']}/Screenshot (${i + 1}).png`);
    setScreenshots(projectScreenshots);
    setCurrentImageIndex(0);
    setLoading(true);
    setIsModalOpen(true);
    project.video &&
      setVideoUrl(project.video);
  };

  const handleVideoModalOpen = (videoUrl: string) => {
    setIsVideoModalOpen(true);
    setVideoUrl(videoUrl);
  };

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <section id='projects' className='flex' ref={containerRef}>
      <div className='flex left-section '>
        <div className="dropdown" ref={dropdownRef}>
          <button className="drop-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{isFeaturedFilter ? 'Featured' : 'Standard'}</span> &nbsp; <div className='icon-select-arrows' />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className='dropdown-content-container'
                initial={{ scale: 0, height: 0 }}
                animate={{ scale: 1, height: 'auto' }}
                exit={{ scale: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-content">
                  <button className={isFeaturedFilter ? 'active' : ''} onClick={() => { setIsFeaturedFilter(true); setIsDropdownOpen(false); handleClick(active); handleClick('All'); setHoveredIndex(-1); }}>Featured</button>
                  {/* <div className='btn-divider' /> */}
                  <button className={isFeaturedFilter ? '' : 'active'} onClick={() => { setIsFeaturedFilter(false); setIsDropdownOpen(false); handleClick(active); handleClick('All'); setHoveredIndex(-1); }}>Standard</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='flex category-buttons'>
          <button className={active === 'All' && !isDropdownOpen ? 'active' : ''} onClick={() => handleClick('All')}>All Projects</button>
          {[...new Set(myProjects.filter((project) => project.isFeatured === isFeaturedFilter).flatMap(project => project.category[0]))].map(category => (
            <button key={category} className={active === category && !isDropdownOpen ? 'active' : ''} onClick={() => handleClick(category)}>{category}</button>
          ))}
        </div>
      </div>

      <div className='flex right-section'>
        <AnimatePresence>
          {projectsFiltered.filter((project) => project.isFeatured === isFeaturedFilter).map((project, index) => (
            <div className='card-container' key={project.imagPath}
              onMouseEnter={(event) => handleMouseEnter(event as unknown as ReactMouseEvent<HTMLDivElement>)}
              onMouseLeave={handleMouseLeave}>
              <motion.article
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={smoothScaleAnimation}
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
                    <button
                      className='icon-airplay link flex'
                      rel="noopener"
                      onClick={() => handleVideoModalOpen(project.video!)}
                      disabled={!project.video}
                    ></button>

                  </div>
                </div>
              </motion.article>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    variants={ringEffect}
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
          setLoading={setLoading}
          onNext={handleNext}
          onPrev={handlePrev}
          totalImages={screenshots.length}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        >
          <div className={`${loading ? 'loading' : ''}`}>
            <img
              src={screenshots[currentImageIndex]}
              alt={`Screenshot ${currentImageIndex + 1}`}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              loading='lazy'
              onLoad={() => setLoading(false)}
            />
            {loading && (
              <div className="blur-overlay">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {isVideoModalOpen && (
        <Modal
          isOpen={isVideoModalOpen}
          onClose={handleVideoModalClose}
          setLoading={setLoading}>
          <div className={`${loading ? 'loading' : ''}`}>
            <iframe
              src={videoUrl}
              title="YouTube Video"
              frameBorder="0"
              className='video'
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoading(false)}
            ></iframe>
            {loading && (
              <div className="blur-overlay">
                <div className="spinner"></div>
              </div>
            )}
          </div>

        </Modal>
      )}
    </section>
  );
}

export default Projects;
