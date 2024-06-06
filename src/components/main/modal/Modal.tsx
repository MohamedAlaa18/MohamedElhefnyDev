import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
  screenshots?: string[];
}

export default function Modal({
  isOpen,
  onClose,
  children,
  onNext,
  onPrev,
  totalImages,
  currentImageIndex,
  setCurrentImageIndex,
  setLoading,
  screenshots = []
}: ModalProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
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
      setLoading(true);
    }
  }, [isOpen, setLoading]);

  const handleCircleClick = (index: number) => {
    if (setCurrentImageIndex) {
      setCurrentImageIndex(index);
      setLoading(true);
    }
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
        if (difference > 0 && onNext) {
          onNext();
        } else if (onPrev) {
          onPrev();
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
                    onMouseEnter={() => handleCircleMouseEnter(i)}
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
                    <div className="spinner"></div>
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
