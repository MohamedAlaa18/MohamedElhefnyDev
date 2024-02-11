import { useState } from 'react'
import './header.css'

function Header() {
    const [showModal, setShowModal] = useState<boolean>();

    return (
        <header className='flex'>
            <button className='icon-menu menu flex' onClick={() => setShowModal(true)} />
            <div />
            <nav>
                <ul className='flex'>
                    <li><a href="">About</a></li>
                    <li><a href="">Article</a></li>
                    <li><a href="">Projects</a></li>
                    <li><a href="">Speaking</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
            <button className='mode flex'><span className='icon-moon-o'></span></button>
            {showModal &&
                <div className='fixed'>
                    <ul className='modal'>
                        <li> <button className='icon-close' onClick={() => setShowModal(false)} /></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Article</a></li>
                        <li><a href="">Projects</a></li>
                        <li><a href="">Speaking</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>
            }
        </header>
    )
}

export default Header