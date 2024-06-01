import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  setLoading: (loading: boolean) => void;
  onNext?: () => void;
  onPrev?: () => void;
  totalImages?: number;
  currentImageIndex?: number;
  setCurrentImageIndex?: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  onNext,
  onPrev,
  totalImages,
  currentImageIndex,
  setCurrentImageIndex,
  setLoading,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen, setLoading]);

  const handleCircleClick = (index: number) => {
    if (setCurrentImageIndex) {
      setCurrentImageIndex(index);
      setLoading(true);
    }
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
      if (Math.abs(difference) > 50) { // Adjust sensitivity as needed
        if (difference > 0 && onNext) {
          onNext(); // Move to next image
        } else if (onPrev) {
          onPrev(); // Move to previous image
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={handleOverlayClick}
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
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <div className="image-wrapper">
              <button className="modal-close" onClick={onClose}>
                <div className="icon-close"></div>
              </button>
              {onPrev && (
                <button className="modal-prev" onClick={onPrev}>
                  <div className='icon-arrow-back' />
                </button>
              )}
              {onNext && (
                <button className="modal-next" onClick={onNext}>
                  <div className='icon-arrow-forward' />
                </button>
              )}

              {children}
            </div>
            {totalImages && currentImageIndex !== undefined && setCurrentImageIndex && (
              <div className="pagination">
                {Array.from({ length: totalImages }, (_, i) => (
                  <div
                    key={i}
                    className={`icon-circle ${i === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleCircleClick(i)}
                  ></div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
