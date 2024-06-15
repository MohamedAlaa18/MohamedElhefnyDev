import './sidebar.css';
import { useEffect, useState } from 'react';
import { useView } from '../../context/useView';


export default function Sidebar() {
    const { view } = useView();
    const [activeSection, setActiveSection] = useState('about');

    const sections = [
        { id: 'about', icon: 'icon-home' },
        { id: 'main', icon: view === 'projects' ? 'icon-code' : view === 'certificates' ? 'icon-atom' : 'icon-gear' },
        { id: 'contact-us', icon: 'icon-envelope' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            let closestSection = '';
            let closestDistance = Infinity;

            sections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - window.innerHeight / 4);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = id;
                    }
                }
            });

            setActiveSection(closestSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -50px 0px" }
        );

        const elements = sections
            .map(({ id }) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null);

        elements.forEach((element) => observer.observe(element));

        return () => {
            elements.forEach((element) => observer.unobserve(element));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="sidebar">
            <div className='circles-container'>
                {sections.map(({ id, icon }) => (
                    <a key={id} href={`#${id}`}>
                        <i className={`${icon} sidebar-circle ${activeSection === id ? 'active' : ''}`} />
                    </a>
                ))}
            </div>
        </div>
    );
}
