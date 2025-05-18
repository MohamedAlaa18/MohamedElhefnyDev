import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useView } from '../../context/useView';

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const { theme, setTheme } = useTheme();
    const { handleViewChange } = useView();

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, view: string) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId) {
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY,
                    behavior: 'smooth',
                });

                setTimeout(() => {
                    handleViewChange(view);
                }, 400);
            }
        }
        setShowModal(false);
    };

    return (
        <header className='flex'>
            <button className='icon-menu menu flex' onClick={() => setShowModal(true)} />
            <div />
            <nav>
                <ul className='flex'>
                    <li><a href="#about">About</a></li>
                    <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'certificates')}>Certificates</a></li>
                    <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a></li>
                    {/* <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'technologies')}>Technologies</a></li> */}
                    <li><a href="#contact-us">Contact us</a></li>
                </ul>
            </nav>

            <button className='mode flex' onClick={handleThemeToggle}>
                <i className={theme === 'dark' ? 'icon-moon' : 'icon-sun'} />
            </button>

            {showModal && (
                <div className='fixed backdrop' onClick={(e) => {
                    if (e.target === e.currentTarget) setShowModal(false);
                }}>
                    <ul className='modal mobile-modal' ref={menuRef}>
                        <li className='close-li'><button className='icon-close' onClick={() => setShowModal(false)} /></li>
                        <li><a href="#about" onClick={() => setShowModal(false)}>About</a></li>
                        <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'certificates')}>Certificates</a></li>
                        <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a></li>
                        {/* <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'technologies')}>Technologies</a></li> */}
                        <li><a href="#contact-us" onClick={() => setShowModal(false)}>Contact us</a></li>
                    </ul>
                </div>
            )}
        </header>
    );
}
