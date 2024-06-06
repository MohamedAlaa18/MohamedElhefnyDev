import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import './dropdown.css';

type DropdownProps = {
    active: string;
    isFeaturedFilter: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsFeaturedFilter: (isFeatured: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    handleClick: (category: string) => void;
    // eslint-disable-next-line no-unused-vars
    setHoveredIndex: (index: number) => void;
};

export default function Dropdown({ isFeaturedFilter, setIsFeaturedFilter, handleClick, active, setHoveredIndex }: DropdownProps) {
    const [isDropdownChecked, setDropdownChecked] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (isFeatured: boolean, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent default anchor behavior
        setIsFeaturedFilter(isFeatured);
        setDropdownChecked(false);
        handleClick(active);
        handleClick('All');
        setHoveredIndex(-1);
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
            <label className="for-dropdown" htmlFor="dropdown">
                {isFeaturedFilter ? 'Featured' : 'Standard'} &nbsp; <div className='icon-select-arrows' />
            </label>
            <motion.div
                className="section-dropdown"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isDropdownChecked ? 1 : 0, y: isDropdownChecked ? 0 : -20 }}
                transition={{ duration: 0.2 }}
            >
                <a href="#" onClick={(e) => handleOptionClick(true, e)} className={isFeaturedFilter ? 'active' : ''}>
                    Featured
                </a>
                <a href="#" onClick={(e) => handleOptionClick(false, e)} className={isFeaturedFilter ? '' : 'active'}>
                    Standard
                </a>
            </motion.div>
        </div>
    );
}
