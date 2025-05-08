import './projects.css';
import { useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { smoothScaleAnimation } from '../../framer-animation';
import { RootState } from '../../../../state/store';
import projectsData from '../../../../../public/data/myProjects.json';
import { Project } from '../../../../types/types';
import { setScreenshots, setLoading, setIsModalOpen } from '../../../../state/projectsSlice';
import Modal from '../../components/modal/Modal';

export default function Projects() {
  const dispatch = useDispatch();
  const {
    isModalOpen, videoUrl, screenshots, loading, isDropdownOpen, currentImageIndex
  } = useSelector((state: RootState) => state.projects);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setHoveredIndex(-1);
  };

  const handleImageClick = useCallback((project: Project) => {
    const images = Array.from(
      { length: project.screenShots.length },
      (_, i) => `${project.screenShots.path}/Screenshot (${i + 1}).png`
    );
    dispatch(setScreenshots(images));
    dispatch(setLoading(true));
    dispatch(setIsModalOpen(true));
  }, [dispatch]);

  const categories = [
    ...new Set(
      projectsData
        .filter(p => p.isFeatured === true) // Filter featured projects if needed
        .flatMap(p => p.category[0])
    )
  ];

  const filteredProjects = activeCategory === 'All'
    ? projectsData.filter(p => p.isFeatured === true) // Assuming you want to filter featured projects
    : projectsData.filter(p => p.isFeatured === true && p.category.includes(activeCategory));

  // const dropdownRef = useRef<HTMLDivElement>(null);

  // const [cardDescriptionHeight, setCardDescriptionHeight] = useState(0);
  // const [descriptionPosition, setDescriptionPosition] = useState<'left' | 'right'>('right');
  // const cardDescriptionRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   if (cardDescriptionRef.current) {
  //     setCardDescriptionHeight(cardDescriptionRef.current.clientHeight);
  //   }
  // }, [hoveredIndex]);

  // const handleClickOutside = (e: MouseEvent) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
  //     setHoveredIndex(-1); // Close dropdown or similar UI element
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  // const preloadImages = (path: string, length: number) => {
  //   Array.from({ length }, (_, i) => new Image().src = `${path}/Screenshot (${i + 1}).png`);
  // };

  // const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
  //   const { right } = e.currentTarget.getBoundingClientRect();
  //   setDescriptionPosition(right + 266 > window.innerWidth ? 'left' : 'right');
  //   setHoveredIndex(index);

  //   const project = projectsData[index];
  //   if (project?.screenShots?.length > 0) {
  //     preloadImages(project.screenShots.path, project.screenShots.length);
  //   }
  // }, []);

  return (
    <section id='projects' className='flex' ref={containerRef}>
      <div className='flex left-section'>
        <div className='flex category-buttons'>
          <button
            className={activeCategory === 'All' && !isDropdownOpen ? 'active' : ''}
            onClick={() => handleCategoryClick('All')}
          >
            All Projects
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={activeCategory === category && !isDropdownOpen ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className='projects right-section flex'>
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isBlurred = hoveredIndex !== -1 && hoveredIndex !== index;

            return (
              <div
                key={project.projectTitle}
                className={`card-container ${isHovered ? 'hovered' : ''} ${isBlurred ? 'motion-article-blur' : ''}`}
              // onMouseEnter={(e) => handleMouseEnter(e, index)}
              // onMouseLeave={() => setHoveredIndex(-1)}
              >
                <motion.article
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={smoothScaleAnimation}
                  className='card'
                >
                  <div className="image-container skeleton">
                    <img
                      className="image"
                      width={266}
                      height={149}
                      src={project.imagPath}
                      srcSet={`${project.imagPath}?w=266 266w, ${project.imagPath}?w=532 532w`}
                      sizes="(max-width: 768px) 100vw, 266px"
                      alt={project.projectTitle}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="overlay" onClick={() => handleImageClick(project)}>
                      <i className="icon-picture" />
                    </div>
                  </div>

                  <div style={{ width: '266px' }} className='box'>
                    <h1 className='title'>{project.projectTitle}</h1>
                    <p className='sub-title'>{project.shortDescription}</p>
                    <div className="flex icons">
                      <div className="flex">
                        <button className="icon-github" onClick={() => window.open(project.source, '_blank')} />
                        <button className="icon-link" onClick={() => window.open(project.demo, '_blank')} />
                      </div>
                      <div className='flex'>
                        <button className='icon-photo link flex' onClick={() => handleImageClick(project)} />
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* {isHovered && (
                  <motion.div
                    ref={cardDescriptionRef}
                    layout
                    initial="hidden"
                    animate="visible"
                    variants={ringEffect}
                    className={`card-description-container visible ${descriptionPosition}`}
                    style={{ top: `calc(50% - ${cardDescriptionHeight / 2}px)` }}
                  >
                    <div className='card-description'>
                      <h1 className='title'>{project.projectTitle}</h1>
                      <div className="book-mark">
                        <div className="triangle-topleft" />
                        <div className="triangle-topright" />
                      </div>
                      <p className='sub-title'>{project.shortDescription}</p>
                    </div>
                  </motion.div>
                )} */}
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <Modal>
          <div className={loading ? 'loading' : ''}>
            {videoUrl ? (
              <video controls src={videoUrl} onLoadedData={() => dispatch(setLoading(false))} />
            ) : (
              <img
                src={screenshots[currentImageIndex]}
                alt={`Screenshot ${currentImageIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onLoad={() => dispatch(setLoading(false))}
              />
            )}
            {loading && (
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