import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useDebouncedCallback } from 'use-debounce';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../../state/store';
import {
  setCurrentImageIndex,
  setIsModalOpen,
  setScreenshots,
  setLoading,
  setVideoUrl
} from '../../../state/projectsSlice';
import Image from 'next/image';

export default function Modal({ children }: { children: ReactNode }) {
  const state = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [showHintArrows, setShowHintArrows] = useState(false); // 🆕

  const modalContentRef = useRef<HTMLDivElement>(null);
  const currentImageIndexRef = useRef<number>(state.currentImageIndex);

  useEffect(() => {
    currentImageIndexRef.current = state.currentImageIndex;
  }, [state.currentImageIndex]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (state.isModalOpen) {
      dispatch(setLoading(true));
      setShowHintArrows(true); // 🆕 show arrows on open
      const timeout = setTimeout(() => setShowHintArrows(false), 3000); // 🆕 auto-hide
      return () => clearTimeout(timeout);
    }
  }, [state.isModalOpen, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.isModalOpen) {
        if (event.key === 'ArrowRight' && state.screenshots.length > 1) {
          handleNext();
        } else if (event.key === 'ArrowLeft' && state.screenshots.length > 1) {
          handlePrev();
        } else if (event.key === 'Escape') {
          handleCloseModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (state.isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isModalOpen]);

  const handleCircleClick = (index: number) => {
    dispatch(setCurrentImageIndex(index));
    dispatch(setLoading(true));
  };

  const handleCircleMouseEnter = (index: number) => {
    setPreviewImageIndex(index);
    setPreviewLoading(true);
  };

  const handleCircleMouseLeave = () => {
    setPreviewImageIndex(null);
    setPreviewLoading(false);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 15) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        dispatch(setLoading(true));
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const modalContent = modalContentRef.current;
      if (modalContent) {
        const contentWidth = modalContent.offsetWidth;
        const contentHeight = modalContent.offsetHeight;

        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;

        const leftPos = x - ((contentWidth / window.innerWidth) * 35);
        const topPos = y - ((contentHeight / window.innerHeight) * 35);

        setMouseX(leftPos);
        setMouseY(topPos);
      }
    }, 100);
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setScreenshots([]));
    dispatch(setVideoUrl(''));
    dispatch(setCurrentImageIndex(0));
  };

  const handleNext = () => {
    const newIndex = (currentImageIndexRef.current + 1) % state.screenshots.length;
    currentImageIndexRef.current = newIndex;
    dispatch(setCurrentImageIndex(newIndex));
    dispatch(setLoading(true));
  };

  const handlePrev = () => {
    const newIndex = (currentImageIndexRef.current - 1 + state.screenshots.length) % state.screenshots.length;
    currentImageIndexRef.current = newIndex;
    dispatch(setCurrentImageIndex(newIndex));
    dispatch(setLoading(true));
  };

  return (
    <AnimatePresence>
      {state.isModalOpen && (
        <motion.div
          className="modal-overlay"
          onClick={handleOverlayClick}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Show Swipe Arrows */}
          {showHintArrows && (
            <div className="swipe-hint">
              <motion.div
                className="swipe-arrow left"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: 2, repeatType: 'mirror', duration: 1 }}
              >
                <i className="icon-reply" />
              </motion.div>
              <motion.div
                className="swipe-arrow right"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: 2, repeatType: 'mirror', duration: 1 }}
              >
                <i className="icon-forward" />
              </motion.div>
            </div>
          )}

          <motion.div
            className="modal-content"
            ref={modalContentRef}
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="image-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="close-wrapper">
                <button aria-label="Close modal" className="modal-close" onClick={handleCloseModal}>
                  <i className="icon-close" />
                </button>
              </div>

              {state.currentImageIndex > 0 && (
                <button className="modal-prev" onClick={() => handleCircleClick(state.currentImageIndex - 1)}>
                  <i className='icon-reply' />
                </button>
              )}
              {state.currentImageIndex < state.screenshots.length - 1 && (
                <button className="modal-next" onClick={() => handleCircleClick(state.currentImageIndex + 1)}>
                  <i className='icon-forward' />
                </button>
              )}

              {children}
            </div>

            <div className="pagination">
              {state.screenshots.map((_: string, index: number) => (
                <div
                  key={index}
                  className={`icon-circle ${index === state.currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleCircleClick(index)}
                  onMouseEnter={() => handleCircleMouseEnter(index)}
                  onMouseLeave={handleCircleMouseLeave}
                />
              ))}
            </div>

            {previewImageIndex !== null && (
              <motion.div
                className="preview-image"
                style={{
                  left: `calc(${mouseX}%  + 200px)`,
                  top: `calc(${mouseY}% + 65px)`,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {previewLoading && (
                  <div className="blur-overlay">
                    <div className="spinner" />
                  </div>
                )}
                <div style={{ position: 'relative', width: '200px', height: '120px' }}>
                  <Image
                    src={state.screenshots[previewImageIndex]}
                    alt={`Preview ${previewImageIndex + 1}`}
                    fill
                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                    onLoad={() => setPreviewLoading(false)}
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
