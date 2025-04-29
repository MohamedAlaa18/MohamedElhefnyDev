import './technologies.css';
import { useState } from 'react';
import technologiesData from '../../../../../public/data/myTechnologies.json';
import { AnimatePresence, motion } from "framer-motion";
import { smoothScaleAnimation } from '../../framer-animation';
import { useTheme } from '../../../../context/ThemeContext';

export default function Technologies() {
    const [active, setActive] = useState('all');
    const [technologiesFiltered, setTechnologiesFiltered] = useState(technologiesData);

    const handleClick = (genre: string) => {
        setActive(genre);
        genre === 'all'
            ? setTechnologiesFiltered(technologiesData)
            : setTechnologiesFiltered(technologiesData.filter((technology) => technology.genre === genre));
    };

    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section id='technologies' className='flex'>
            <div className='left-section flex'>
                <button className={active === 'all' ? 'active' : ''} onClick={() => handleClick('all')}>
                    All Technologies
                </button>
                {[...new Set(technologiesData.flatMap(project => project.genre))].map(genre => (
                    <button key={genre} className={active == genre ? 'active' : ''} onClick={() => handleClick(genre)}>{genre}</button>
                ))}
            </div>

            <div className="right-section flex">
                <AnimatePresence>
                    {technologiesFiltered.map((technology, index) => (
                        <div className='technology-card' key={index}>
                            <motion.article
                                layout
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={smoothScaleAnimation}>

                                <div className="card-top">
                                    <img
                                        src={
                                            !isDark && technology.svg.includes('-dark')
                                                ? technology.svg.replace('-dark', '-light')
                                                : technology.svg
                                        }
                                        alt={technology.label}
                                        className="technology-icon card-img"
                                    />
                                </div>

                                <h1 className="card-bottom">{technology.label}</h1>
                            </motion.article>
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}