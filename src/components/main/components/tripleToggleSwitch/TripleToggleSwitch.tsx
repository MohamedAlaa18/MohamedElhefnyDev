import './tripleToggleSwitch.css';
import { useState, useEffect } from 'react';
import { useView } from '../../../../context/useView';
import { labels } from '../../../../types/types';

const ANIMATION_DURATION = 400;

export default function TripleToggleSwitch({ labels }: { labels: labels }) {
    const { view, handleViewChange } = useView();
    const [switchPosition, setSwitchPosition] = useState('right');
    const [animation, setAnimation] = useState<string | null>(null);

    useEffect(() => {
        if (view === 'projects' || view === 'certificates') {
            const newSwitchPosition = view === 'projects' ? 'center' : view === 'certificates' ? 'left' : '';
            setSwitchPosition(newSwitchPosition);

            const animationName = getAnimationName(switchPosition, newSwitchPosition);
            if (animationName) {
                setAnimation(animationName);
                setTimeout(() => setAnimation(null), ANIMATION_DURATION * 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    const getAnimationName = (oldPosition: string, newPosition: string): string | null => {
        if (oldPosition === newPosition) {
            return null;
        }

        if (oldPosition === 'left') {
            return newPosition === 'center' ? 'left-to-center' : 'left-to-right';
        } else if (oldPosition === 'center') {
            return newPosition === 'left' ? 'center-to-left' : 'center-to-right';
        } else if (oldPosition === 'right') {
            return newPosition === 'center' ? 'right-to-center' : 'right-to-left';
        }

        return null;
    };

    const handleSwitchChange = (value: string) => {
        const newAnimation = getAnimationName(switchPosition, value);
        setSwitchPosition(value);
        setAnimation(newAnimation);
        handleViewChange(value === 'center' ? 'projects' : value === 'right' ? 'technologies' : 'certificates');
    };

    return (
        <div className={`main-container ${switchPosition}-position`}>
            <div className={`switch ${animation} ${switchPosition}-position`} />
            <input type="radio" id="left" name="map-switch" value="left" checked={switchPosition === 'left'} onChange={() => handleSwitchChange('left')} />
            <label htmlFor="left" className={`left-label flex ${switchPosition === 'left' && 'white-font'}`}>
                <span>{labels.left.title}</span>
                <i className={`${labels.left.icon}`} />
            </label>

            <input type="radio" id="center" name="map-switch" value="center" checked={switchPosition === 'center'} onChange={() => handleSwitchChange('center')} />
            <label htmlFor="center" className={`center-label flex ${switchPosition === 'center' && 'white-font'}`} >
                <span>{labels.center.title}</span>
                <i className={`${labels.center.icon}`} />
            </label>

            {/* <input type="radio" id="right" name="map-switch" value="right" checked={switchPosition === 'right'} onChange={() => handleSwitchChange('right')} />
            <label htmlFor="right" className={`right-label flex ${switchPosition === 'right' && 'white-font'}`}  >
                <span>{labels.right.title}</span>
                <i className={`${labels.right.icon}`} />
            </label> */}
        </div>
    );
}