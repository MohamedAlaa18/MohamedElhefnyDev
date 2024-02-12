import { useEffect, useState } from 'react'
import './header.css'

function Header() {
    const [showModal, setShowModal] = useState<boolean>();
    const [theme, setTheme] = useState(localStorage.getItem("currentTheme") ?? "dark");

    useEffect(() => {
        if (theme == "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }
    }, [theme]);

    const handelClick = () => {
        localStorage.setItem("currentTheme", theme == "dark" ? "light" : "dark");
        setTheme(localStorage.getItem("currentTheme") ?? "dark")
    }

    return (
        <header id='header'  className='flex'>
            <button className='icon-menu menu flex' onClick={() => setShowModal(true)} />
            <div />
            <nav>
                <ul className='flex'>
                    <li><a href="#header">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="">Experience</a></li>
                    <li><a href="">Certificates</a></li>
                    <li><a href="#contact-us">Contact us</a></li>
                </ul>
            </nav>
            <button className='mode flex' onClick={() => handelClick()}>
                <span className={theme == 'dark' ? 'icon-moon-o' : 'icon-sun'}></span>
            </button>
            {showModal &&
                <div className='fixed'>
                    <ul className='modal'>
                        <li> <button className='icon-close' onClick={() => setShowModal(false)} /></li>
                        <li><a href="#header">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="">Experience</a></li>
                        <li><a href="">Certificates</a></li>
                        <li><a href="#contact-us">Contact us</a></li>
                    </ul>
                </div>
            }
        </header>
    )
}

export default Header