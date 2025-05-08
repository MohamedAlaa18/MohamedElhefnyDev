import { useState, useRef, useEffect } from 'react';
import './resumeButton.css';
// import { useTheme } from '../../context/ThemeContext';

function ResumeButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    // const { theme } = useTheme();/
    // const isDark = theme === "dark";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowResume(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (showResume) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showResume]);

    const buttonCount = 4;
    const radius = 40;
    const arc = Math.PI; // 180 degrees
    const startAngle = arc * - 1 / 7; // center the arc

    const getButtonStyle = (index: number): React.CSSProperties => {
        if (!isOpen) return {};
        const angle = startAngle + (arc / (buttonCount - 1)) * index;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return {
            transform: `translate(${x}px, ${y}px)`,
            opacity: 1,
        };
    };

    return (
        <>
            <div className="resume-button">
                <div className={`button-wrapper ${isOpen ? 'open' : ''}`} ref={wrapperRef}>
                    <button className="main-button" onClick={() => setIsOpen(!isOpen)}>
                        <span className={`plus-icon ${isOpen ? 'open' : ''}`}>
                            {/* CV */}
                            <i className='icon-profile-male' />
                            {/* <img src={isDark ? './images/resume_dark.png' : './images/resume_light.png'} alt="Profile" className="profile-image" /> */}
                        </span>
                    </button>

                    <div className="sub-buttons">
                        <a href="/Mohamed Alaa El-hefny.pdf"
                            download
                            className="sub-button" style={getButtonStyle(1)}>
                            <i className="icon-download" />
                        </a>
                        <button className="sub-button" style={getButtonStyle(0)} onClick={() => setShowResume(true)}>
                            <i className="icon-file-pdf-o" />
                        </button>
                    </div>
                </div>
            </div>
            {showResume && (
                <div
                    className="backdrop"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowResume(false);
                    }}
                >
                    <div className="modal">
                        <div className="close-wrapper">
                            <button
                                className="modal-close"
                                onClick={() => setShowResume(false)}
                            >
                                <i className='icon-close' />
                            </button>
                        </div>
                        {/* <Resume /> */}
                        <iframe
                            src="/Mohamed Alaa El-hefny.pdf"
                            width="100%"
                            height="100%"
                            title="CV"
                            style={{ border: "none" }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ResumeButton;
