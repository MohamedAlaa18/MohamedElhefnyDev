import './footer.css'
import { useView } from '../../context/useView';

export default function Footer() {
  const { handleViewChange } = useView();

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, view: string) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (targetId) {
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });

        setTimeout(() => {
          handleViewChange(view);
        }, 400);
      }
    }
  };

  return (
    <footer className='flex'>
      <ul className='flex'>
        <li><a href="#about">About</a></li>
        <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'certificates')}>Certificates</a></li>
        <li><a href="#main" onClick={(e) => handleScrollToSection(e, 'projects')}>Projects</a></li>
        {/* <li><a href="#main" onClick={() => handleViewChange('technologies')}>Technologies</a></li> */}
        <li><a href="#contact-us">Contact us</a></li>
      </ul>
      <p>&copy;{new Date().getFullYear()} Mohamed El Hefny. <span>All rights reserved.</span> </p>
    </footer>
  )
}