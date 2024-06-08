import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import './projects.css';
import { AnimatePresence, motion } from "framer-motion";
import Modal from '../modal/Modal';
import { ringEffect, smoothScaleAnimation } from '../framer-animation';
import Dropdown from '../dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActive,
  setIsFeaturedFilter,
  setProjectsFiltered,
  setHoveredIndex,
  setDescriptionPosition,
  setCurrentImageIndex,
  setIsModalOpen,
  setScreenshots,
  setLoading,
  setIsDropdownOpen,
  setVideoUrl
} from '../../../state/projectsSlice';
import { RootState } from '../../../state/store';
import { myProjects } from './myProjects';
import { Project } from '../../../types/types';

export default function Projects() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.projects);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardDescriptionRef = useRef<HTMLDivElement>(null);
  const [cardDescriptionHeight, setCardDescriptionHeight] = useState<number>(0);

  useEffect(() => {
    if (cardDescriptionRef.current) {
      setCardDescriptionHeight(cardDescriptionRef.current.clientHeight);
    }
  }, [state.hoveredIndex]);

  const handleClick = (category: string) => {
    dispatch(setActive(category));

    let filteredProjects = myProjects;

    if (category !== 'All') {
      filteredProjects = filteredProjects.filter((project) => project.category.includes(category));
    }

    dispatch(setProjectsFiltered(filteredProjects));
    dispatch(setHoveredIndex(-1));
  };

  const handleMouseEnter = (event: ReactMouseEvent<HTMLDivElement>, index: number) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.right + 266 > viewportWidth) {
      dispatch(setDescriptionPosition('left'));
    } else {
      dispatch(setDescriptionPosition('right'));
    }

    dispatch(setHoveredIndex(index));
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredIndex(-1));
  };

  const handleNext = () => {
    dispatch(setCurrentImageIndex((state.currentImageIndex + 1) % state.screenshots.length));
    dispatch(setLoading(true));
  };

  const handlePrev = () => {
    dispatch(setCurrentImageIndex((state.currentImageIndex - 1 + state.screenshots.length) % state.screenshots.length));
    dispatch(setLoading(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setScreenshots([]));
    dispatch(setVideoUrl(''));
  };

  const handleImageClick = (project: Project) => {
    const projectScreenshots = Array.from({ length: project.screenShots.length }, (_, i) => `${project.screenShots.path}/Screenshot (${i + 1}).png`);
    dispatch(setScreenshots(projectScreenshots));
    dispatch(setCurrentImageIndex(0));
    dispatch(setLoading(true));
    dispatch(setIsModalOpen(true));
  };

  const handleVideoModalOpen = (videoUrl: string) => {
    dispatch(setIsModalOpen(true));
    dispatch(setVideoUrl(videoUrl));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.isModalOpen) {
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
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dispatch(setIsDropdownOpen(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownRef]);

  return (
    <section id='projects' className='flex' ref={containerRef}>
      <div className='flex left-section'>
        <Dropdown
          isFeaturedFilter={state.isFeaturedFilter}
          setIsFeaturedFilter={(filter) => dispatch(setIsFeaturedFilter(filter))}
          handleClick={handleClick}
          active={state.active}
          setHoveredIndex={(index) => dispatch(setHoveredIndex(index))}
        />

        <div className='flex category-buttons'>
          <button className={state.active === 'All' && !state.isDropdownOpen ? 'active' : ''} onClick={() => handleClick('All')}>All Projects</button>
          {[...new Set(myProjects.filter((project) => project.isFeatured === state.isFeaturedFilter).flatMap(project => project.category[0]))].map(category => (
            <button key={category} className={state.active === category && !state.isDropdownOpen ? 'active' : ''} onClick={() => handleClick(category)}>{category}</button>
          ))}
        </div>
      </div>

      <div className='projects right-section flex'>
        <AnimatePresence initial={false}>
          {state.projectsFiltered.filter((project) => project.isFeatured === state.isFeaturedFilter).map((project: Project, index: number) => (
            <div key={project.projectTitle} className={`card-container ${state.hoveredIndex === index ? 'hovered' : ''} ${state.hoveredIndex !== -1 && state.hoveredIndex !== index ? 'motion-article-blur' : ''}`}
              onMouseEnter={(event) => handleMouseEnter(event as ReactMouseEvent<HTMLDivElement>, index)}
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
                    <i className="icon-picture" />
                  </div>
                </div>
                <div style={{ width: "266px" }} className='box'>
                  <h1 className='title'>{project.projectTitle}</h1>
                  <p className='sub-title'>{project.projectDescription}</p>

                  <div className="flex icons">
                    <div className='flex'>
                      <a className="icon-link" target="_blank" href={project.demo} rel="noopener noreferrer" />
                      <a className="icon-github" target="_blank" href={project.source} rel="noopener noreferrer" />
                    </div>

                    <button
                      className='icon-airplay link flex'
                      rel="noopener"
                      onClick={() => handleVideoModalOpen(project.video!)}
                      disabled={!project.video}
                    />
                  </div>
                </div>
              </motion.article>

              <AnimatePresence>
                {state.hoveredIndex === index && (
                  <motion.div
                    ref={cardDescriptionRef}
                    layout
                    initial="hidden"
                    animate="visible"
                    variants={ringEffect}
                    className={`card-description-container visible ${state.descriptionPosition === 'right' ? 'right' : 'left'}`}
                    style={{ top: `calc(50% - ${cardDescriptionHeight / 2}px)` }}
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

      {state.isModalOpen && (
        <Modal
          isOpen={state.isModalOpen}
          onClose={handleCloseModal}
          screenshots={state.screenshots}
        >
          <div className={`${state.loading ? 'loading' : ''}`}>
            {state.videoUrl ? (
              <iframe
                src={state.videoUrl}
                title="YouTube Video"
                frameBorder="0"
                className='video'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => dispatch(setLoading(false))}
              />
            ) : (
              <img
                src={state.screenshots[state.currentImageIndex]}
                alt={`Screenshot ${state.currentImageIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                loading='lazy'
                onLoad={() => dispatch(setLoading(false))}
              />
            )}
            {state.loading && (
              <div className="blur-overlay">
                <div className="spinner" />
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
