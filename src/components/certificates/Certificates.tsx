import { useState } from 'react';
import certificatesData from '../../../public/data/myCertificates.json';
import { AnimatePresence, motion } from "framer-motion"
import { smoothScaleAnimation } from '../main/framer-animation';
import Image from 'next/image';

export default function Certificates() {
  const [active, setActive] = useState('all');
  const [certificatesFiltered, setCertificatesFiltered] = useState(certificatesData);

  const handleClick = (genre: string) => {
    setActive(genre);
    setCertificatesFiltered(
      genre === 'all' ? certificatesData : certificatesData.filter(c => c.genre === genre)
    );
  };


  return (
    <section id='certificates' className='flex'>
      <div className='left-section flex'>
        <button className={active == 'all' ? 'active' : ''} onClick={() => { handleClick('all') }}>All Certificates</button>
        <button className={active == 'Course' ? 'active' : ''} onClick={() => { handleClick('Course') }}>Courses</button>
        <button className={active == 'Scholarship' ? 'active' : ''} onClick={() => { handleClick('Scholarship') }}>Scholarships</button>
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
                  <Image height={44} width={44} src={certificate.imagPath} alt="facebook_logo" />
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