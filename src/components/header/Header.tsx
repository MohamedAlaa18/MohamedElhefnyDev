import { useEffect, useRef, useState } from 'react';
import './header.css';
import { useTheme } from '../../context/ThemeContext';
import { useView } from '../../context/useView';

export default function Header() {
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);
    const { theme, setTheme } = useTheme();
    const { handleViewChange } = useView();

    const handleClick = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleCloseMenu = (view: string) => {
        setShowModal(false);
        if (view === 'projects' || view === 'certificates') handleViewChange(view);
    };

    return (
        <header className='flex'>
            <button className='icon-menu menu flex' onClick={() => setShowModal(true)} />
            <div />
            <nav>
                <ul className='flex'>
                    <li><a href="#about">About</a></li>
                    <li><a href="#main" onClick={() => handleViewChange('projects')}>Projects</a></li>
                    <li><a href="#main" onClick={() => handleViewChange('certificates')}>Certificates</a></li>
                    <li><a href="#contact-us">Contact us</a></li>
                </ul>
            </nav>
            <button className='mode flex' onClick={handleClick}>
                <i className={theme === 'dark' ? 'icon-moon-o' : 'icon-sun'} />
            </button>
            {showModal &&
                <div className='fixed'>
                    <ul className='modal' ref={menuRef}>
                        <li><button className='icon-close' onClick={() => setShowModal(false)} /></li>
                        <li><a href="#about" onClick={() => handleCloseMenu('about')}>About</a></li>
                        <li><a href="#main" onClick={() => handleCloseMenu('projects')}>Projects</a></li>
                        <li><a href="#main" onClick={() => handleCloseMenu('certificates')}>Certificates</a></li>
                        <li><a href="#contact-us" onClick={() => handleCloseMenu('contact-us')}>Contact us</a></li>
                    </ul>
                </div>
            }
        </header>
    );
}
