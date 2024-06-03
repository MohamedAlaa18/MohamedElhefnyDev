import { useView } from '../../context/useView';
import './footer.css'


const Footer = () => {

  const { handleViewChange } = useView();

  return (
    <footer className='flex'>
      <ul className='flex'>
        <li><a href="#about">About</a></li>
        <li><a href="#main" onClick={() => handleViewChange('projects')}>Projects</a></li>
        <li><a href="#main" onClick={() => handleViewChange('certificates')}>Certificates</a></li>
        <li><a href="#contact-us">Contact us</a></li>
      </ul>
      <p>&copy;{new Date().getFullYear()} Mohamed Alaa. <span>All rights reserved.</span> </p>
    </footer>
  )
}

export default Footer