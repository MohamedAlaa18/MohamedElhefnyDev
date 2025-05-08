import { useEffect, useState, MouseEvent } from 'react';
import './doubleToggleSwitch.css';
import { useView } from '../../../../context/useView';

function DoubleToggleSwitch() {
    const { view, handleViewChange } = useView();
    const [isOn, setIsOn] = useState(view === 'certificates');

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const newState = !isOn;
        setIsOn(newState);
        handleViewChange(newState ? 'certificates' : 'projects');
    };

    useEffect(() => {
        setIsOn(view === 'certificates');
    }, [view]);

    const toggleClasses = [
        'toggle',
        !isOn ? 'toggle--certificates' : 'toggle--projects',
    ].join(' ');

    return (
        <a href="#" className={toggleClasses} onClick={handleClick}>
            {/* Slider with icon */}
            <div className="toggle__slider">
                {/* {isOn ? <i className="icon-code" /> : <i className="icon-graduation-cap" />} */}
                {isOn ? <span>Certificates</span> : <span>Projects</span>}
            </div>

            {/* Options */}
            <span className="toggle__option toggle__option--certificates">
                <p className="text-wrapper">Certificates</p>
            </span>
            <span className="toggle__option toggle__option--projects">
                <p className="text-wrapper">Projects</p>
            </span>
        </a>
    );
}

export default DoubleToggleSwitch;
