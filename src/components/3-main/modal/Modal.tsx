import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    onNext: () => void;
    onPrev: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, onNext, onPrev }) => {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    onClick={handleOverlayClick}
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
                        <button className="modal-close" onClick={onClose}>
                            <div className='icon-close'></div>
                        </button>
                        <button className="modal-prev" onClick={onPrev}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                            </svg>
                        </button>
                        <button className="modal-next" onClick={onNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19" />
                            </svg>
                        </button>
                        <div className='img-container'>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
