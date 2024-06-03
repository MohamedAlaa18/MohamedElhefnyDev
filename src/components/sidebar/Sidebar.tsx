import { useEffect, useState } from 'react';
import './sidebar.css';
import { useView } from '../../context/useView';


const Sidebar = () => {
    const { view } = useView();
    const [activeSection, setActiveSection] = useState<string>('');
    const [scrollVisible, setScrollVisible] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 300 ? setScrollVisible(true) : setScrollVisible(false);
        })
    }, [])


    const sections = [
        { id: 'about', icon: 'icon-home' },
        { id: 'main', icon: view === 'projects' ? 'icon-code' : 'icon-atom' },
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
        handleScroll();

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
            { threshold: 0.5 }
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
        <div className={`sidebar  ${scrollVisible && 'line'}`}>
            <div className='circles-container'>
                {sections.map(({ id, icon }) => (
                    <a key={id} href={`#${id}`} className={`sidebar-circle ${activeSection === id ? 'active' : ''}`}>
                        <div className={`${icon}`} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
