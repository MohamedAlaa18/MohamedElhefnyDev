import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './dropdown.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../state/store';
import { setHoveredIndex, setIsFeaturedFilter } from '../../../../state/projectsSlice';

// eslint-disable-next-line no-unused-vars
export default function Dropdown({ handleClick }: { handleClick: (category: string) => void }) {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.projects);

    const [isDropdownChecked, setDropdownChecked] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (isFeatured: boolean, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch(setIsFeaturedFilter(isFeatured));
        setDropdownChecked(false);
        handleClick(state.active);
        handleClick('All');
        dispatch(setHoveredIndex(-1));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownChecked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="sec-center" ref={dropdownRef}>
            <input
                className="dropdown"
                type="checkbox"
                id="dropdown"
                name="dropdown"
                checked={isDropdownChecked}
                onChange={() => setDropdownChecked(!isDropdownChecked)}
            />
            <label className="for-dropdown flex" htmlFor="dropdown">
                {state.isFeaturedFilter ? 'Featured' : 'Standard'}<div className='icon-select-arrows' />
            </label>
            <motion.div
                className="section-dropdown"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isDropdownChecked ? 1 : 0, y: isDropdownChecked ? 0 : -20 }}
                transition={{ duration: 0.2 }}
            >
                <a href="#" onClick={(e) => handleOptionClick(true, e)} className={state.isFeaturedFilter ? 'active' : ''}>
                    Featured
                </a>
                <a href="#" onClick={(e) => handleOptionClick(false, e)} className={state.isFeaturedFilter ? '' : 'active'}>
                    Standard
                </a>
            </motion.div>
        </div>
    );
}
