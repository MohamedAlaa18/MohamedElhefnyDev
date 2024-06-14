import './certificates.css'
import { useState } from 'react';
import { myCertificates } from './myCertificates'
import { AnimatePresence, motion } from "framer-motion"
import { smoothScaleAnimation } from '../../framer-animation';

export default function Certificates() {
  const [active, setActive] = useState('all');
  const [certificatesFiltered, setCertificatesFiltered] = useState(myCertificates);

  const handelClick = (genre: string) => {
    setActive(genre);
    genre == 'all' ?
      setCertificatesFiltered(myCertificates)
      :
      setCertificatesFiltered(myCertificates.filter((certificate) => certificate.genre == genre));
  };

  return (
    <section id='certificates' className='flex'>
      <div className='flex left-section'>
        <button className={active == 'all' ? 'active' : ''} onClick={() => { handelClick('all') }}>All Certificates</button>
        <button className={active == 'Course' ? 'active' : ''} onClick={() => { handelClick('Course') }}>Courses</button>
        <button className={active == 'Internship' ? 'active' : ''} onClick={() => { handelClick('Internship') }}>Internships</button>
      </div>

      <div className='right-section flex'>
        <AnimatePresence>
          {certificatesFiltered.map((certificate) => (
            <a href={certificate.url} key={certificate.myCertificateTitle} target="_blank">
              <motion.article
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={smoothScaleAnimation}
                key={certificate.myCertificateTitle}
                className='flex certificate'>

                <div className='image-parent skeleton flex'>
                  <img src={certificate.imagPath} alt="facebook_logo" />
                </div>

                <div style={{ width: "333px" }} >
                  <h1>{certificate.myCertificateTitle}</h1>
                  <div className='name flex'>
                    <p>{certificate.company}</p>
                    <p >{certificate.data}</p>
                  </div>
                </div>

              </motion.article>
            </a>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}