import { useEffect, useState, MouseEvent } from 'react';
import './doubleToggleSwitch.css';
import { useView } from '../../../../context/useView';

function DoubleToggleSwitch() {
    const { view, handleViewChange } = useView();
    const [isOn, setIsOn] = useState(view === 'certificates');
    const [isMoving, setIsMoving] = useState(false);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const newState = !isOn;
        setIsOn(newState);
        setIsMoving(true);
        handleViewChange(newState ? 'certificates' : 'projects');
        setTimeout(() => setIsMoving(false), 500);
    };

    useEffect(() => {
        setIsOn(view === 'certificates');
    }, [view]);

    const toggleClasses = [
        'toggle',
        isOn ? 'toggle--projects' : 'toggle--certificates',
        isMoving ? 'toggle--moving' : '',
    ].join(' ');

    return (
        <a href="#" className={toggleClasses} onClick={handleClick}>
            <span className="toggle__option toggle__option--certificates">Certificates</span>
            <span className="toggle__option toggle__option--projects">Projects</span>
        </a>
    );
}

export default DoubleToggleSwitch;
