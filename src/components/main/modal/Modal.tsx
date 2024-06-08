import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './modal.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../state/store';
import { setCurrentImageIndex, setLoading } from '../../../state/projectsSlice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  screenshots?: string[];
}

export default function Modal({
  isOpen,
  onClose,
  children,
  screenshots = []
}: ModalProps) {
  const state = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(setLoading(true));
    }
  }, [isOpen, dispatch]);

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
    if (touchStartX && touchEndX) {
      const difference = touchStartX - touchEndX;
      if (Math.abs(difference) > 50) {
        if (difference > 0 && state.currentImageIndex !== undefined) {
          dispatch(setCurrentImageIndex((state.currentImageIndex + 1) % screenshots.length));
          dispatch(setLoading(true));
        } else if (state.currentImageIndex !== undefined) {
          dispatch(setCurrentImageIndex((state.currentImageIndex - 1 + screenshots.length) % screenshots.length));
          dispatch(setLoading(true));
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={handleOverlayClick}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            ref={modalContentRef}
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div className="image-wrapper">
              <button className="modal-close" onClick={onClose}>
                <div className="icon-close"></div>
              </button>
              {(state.currentImageIndex !== -1 && state.screenshots) && (
                <>
                  {state.currentImageIndex > 0 && (
                    <button className="modal-prev" onClick={() => handleCircleClick(state.currentImageIndex - 1)}>
                      <div className='icon-arrow-back' />
                    </button>
                  )}
                  {state.currentImageIndex < screenshots.length - 1 && (
                    <button className="modal-next" onClick={() => handleCircleClick(state.currentImageIndex + 1)}>
                      <div className='icon-arrow-forward' />
                    </button>
                  )}
                </>
              )}
              {children}
            </div>
            {screenshots && (
              <div className="pagination">
                {screenshots.map((_, index) => (
                  <div
                    key={index}
                    className={`icon-circle ${index === state.currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleCircleClick(index)}
                    onMouseEnter={() => handleCircleMouseEnter(index)}
                    onMouseLeave={handleCircleMouseLeave}
                  />
                ))}
              </div>
            )}
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
                <img
                  src={screenshots[previewImageIndex]}
                  alt={`Preview ${previewImageIndex + 1}`}
                  onLoad={() => setPreviewLoading(false)}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
