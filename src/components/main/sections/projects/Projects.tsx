import './projects.css';
import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, useLayoutEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "framer-motion";
import { ringEffect, smoothScaleAnimation } from '../../framer-animation';
import { RootState } from '../../../../state/store';
import projectsData from '../../../../../public/data/myProjects.json';
import { Project } from '../../../../types/types';
import {
  setActive,
  setHoveredIndex,
  setDescriptionPosition,
  setCurrentImageIndex,
  setIsModalOpen,
  setScreenshots,
  setLoading,
  setIsDropdownOpen,
  setVideoUrl
} from '../../../../state/projectsSlice';
import Dropdown from '../../components/dropdown/Dropdown';
import Modal from '../../components/modal/Modal'

export default function Projects() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.projects);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardDescriptionRef = useRef<HTMLDivElement>(null);
  const [cardDescriptionHeight, setCardDescriptionHeight] = useState<number>(0);
  const [projectsFiltered, setProjectsFiltered] = useState<Project[]>(projectsData);

  useLayoutEffect(() => {
    if (cardDescriptionRef.current) {
      setCardDescriptionHeight(cardDescriptionRef.current.clientHeight);
    }
  }, [state.hoveredIndex]);

  const handleClick = useCallback((category: string) => {
    dispatch(setActive(category));
    let filteredProjects = projectsData; // Use JSON data as source

    if (category !== 'All') {
      filteredProjects = filteredProjects.filter((project) => project.category.includes(category));
    }

    setProjectsFiltered(filteredProjects);
    dispatch(setHoveredIndex(-1));
  }, [dispatch]);

  const handleMouseEnter = useCallback((event: ReactMouseEvent<HTMLDivElement>, index: number) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.right + 266 > viewportWidth) {
      dispatch(setDescriptionPosition('left'));
    } else {
      dispatch(setDescriptionPosition('right'));
    }

    dispatch(setHoveredIndex(index));
  }, [dispatch]);

  const handleMouseLeave = useCallback(() => {
    dispatch(setHoveredIndex(-1));
  }, [dispatch]);

  const handleImageClick = useCallback((project: Project) => {
    const projectScreenshots = Array.from({ length: project.screenShots.length }, (_, i) => `${project.screenShots.path}/Screenshot (${i + 1}).png`);
    dispatch(setScreenshots(projectScreenshots));
    dispatch(setCurrentImageIndex(0));
    dispatch(setLoading(true));
    dispatch(setIsModalOpen(true));
  }, [dispatch]);

  const handleVideoModalOpen = useCallback((videoUrl: string) => {
    dispatch(setIsModalOpen(true));
    dispatch(setVideoUrl(videoUrl));
  }, [dispatch]);

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
  }, [dispatch]);

  return (
    <section id='projects' className='flex' ref={containerRef}>
      <div className='flex left-section'>
        <Dropdown handleClick={handleClick} />

        <div className='flex category-buttons'>
          <button className={state.active === 'All' && !state.isDropdownOpen ? 'active' : ''} onClick={() => handleClick('All')}>All Projects</button>
          {[...new Set(projectsData.filter((project) => project.isFeatured === state.isFeaturedFilter).flatMap(project => project.category[0]))].map(category => (
            <button key={category} className={state.active === category && !state.isDropdownOpen ? 'active' : ''} onClick={() => handleClick(category)}>{category}</button>
          ))}
        </div>
      </div>

      <div className='projects right-section flex'>
        <AnimatePresence>
          {projectsFiltered.filter((project) => project.isFeatured === state.isFeaturedFilter).map((project: Project, index: number) => (
            <div
              key={project.projectTitle}
              className={`card-container ${state.hoveredIndex === index ? 'hovered' : ''} ${state.hoveredIndex !== -1 && state.hoveredIndex !== index ? 'motion-article-blur' : ''}`}
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
                <div className="image-container skeleton">
                  <img className="image" width={266} src={project.imagPath} alt={project.projectTitle} loading='lazy' decoding="async" />
                  <div className="overlay" onClick={() => handleImageClick(project)}>
                    <i className="icon-picture" />
                  </div>
                </div>
                <div style={{ width: "266px" }} className='box'>
                  <h1 className='title'>{project.projectTitle}</h1>
                  <p className='sub-title'>{project.projectDescription}</p>

                  <div className="flex icons">
                    <div className="flex">
                      <button
                        type="button"
                        className="icon-link"
                        onClick={() => window.open(project.demo, '_blank')}
                        disabled={!project.demo}
                      />
                      <button
                        className="icon-github"
                        onClick={() => window.open(project.source, '_blank')}
                        disabled={!project.source}
                      />
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
                      <div className="triangle-topleft"></div>
                      <div className="triangle-topright"></div>
                    </div>
                    <p className='sub-title'>{project.projectDescription}</p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {state.isModalOpen && (
        <Modal>
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
