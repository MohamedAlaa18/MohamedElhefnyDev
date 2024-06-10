import './technologies.css';
import { myTechnologies } from './myTechnologies';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Technology } from '../../types/types';
import { smoothScaleAnimation } from '../main/framer-animation';

export default function Technologies() {
    const [active, setActive] = useState('all');
    const [technologiesFiltered, setTechnologiesFiltered] = useState<Technology[]>(myTechnologies);

    const handleClick = (genre: string) => {
        setActive(genre);
        genre === 'all'
            ? setTechnologiesFiltered(myTechnologies)
            : setTechnologiesFiltered(myTechnologies.filter((technology) => technology.genre === genre));
    };

    return (
        <section id='technologies' className='flex'>
            <div className='left-section flex'>
                <button className={active === 'all' ? 'active' : ''} onClick={() => handleClick('all')}>
                    All Technologies
                </button>
                {[...new Set(myTechnologies.flatMap(project => project.genre))].map(genre => (
                    <button key={genre} className={active == genre ? 'active' : ''} onClick={() => handleClick(genre)}>{genre}</button>
                ))}
            </div>

            <div className="right-section flex">
                {technologiesFiltered.map((technology) => (
                    <div className='technology-card'>
                        <motion.article
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={smoothScaleAnimation}
                            key={technology.label}
                        >
                            <img src={technology.svg} alt={technology.label} className="technology-icon" />
                            <span className="technology-label">{technology.label}</span>
                        </motion.article>
                    </div>
                ))}
            </div>
        </section>
    );
}