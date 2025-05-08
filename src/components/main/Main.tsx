import './main.css';
import { useState } from 'react';
import { useView } from '../../context/useView';
import Projects from './sections/projects/Projects';
import Certificates from './sections/certificates/Certificates';
import Technologies from './sections/technologies/Technologies';
import DoubleToggleSwitch from './components/doubleToggleSwitch/DoubleToggleSwitch';

export default function Main({ mainAnimated }: { mainAnimated: boolean }) {
  const { view, handleViewChange } = useView();
  const [oldView, setOldView] = useState(view);

  // const labels = {
  //   right: {
  //     title: "Technologies",
  //     value: "technologies",
  //     icon: "icon-gear",
  //   },
  //   center: {
  //     title: "Projects",
  //     value: "projects",
  //     icon: "icon-code",
  //   },
  //   left: {
  //     title: "Certificates",
  //     value: "certificates",
  //     icon: "icon-graduation-cap",
  //   },
  // };

  const toggleView = () => {
    if (view !== 'technologies') {
      setOldView(view);
      handleViewChange('technologies');
    } else {
      handleViewChange(oldView);
    }
  };

  const animationPaths = {
    projects: "#Path-1",
    certificates: "#Path-1",
    technologies: "#Path-1",
  };

  return (
    <main className="flex">
      <DoubleToggleSwitch />

      {(view === 'projects' || view === 'technologies') && (
        <>
          <button
            className={`technologies-toggle flex ${(view === 'technologies') && 'active'}`}
            onClick={() => toggleView()}
          >
            <i className={`${view === 'projects' ? 'icon-gear' : 'icon-code'}`} />
          </button>

          <div className="graph_wrapper">
            <svg viewBox="0 0 315 107" version="1.1" style={{ overflow: "visible" }}>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path id="Path-1" className="path" fill="none" stroke="var(--title)" strokeWidth="4" strokeLinejoin="round" strokeMiterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81" />

                <path className="dashed" fill="none" stroke="var(--secondary)" strokeWidth="10" strokeLinejoin="round" strokeMiterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81" />

                <polyline id="arrow" points="0,-9 18,0 0,9 5,0" fill="var(--title)">
                  <animateMotion
                    rotate="auto"
                    begin="0s"
                    dur="2.2s"
                    repeatCount="1"
                    fill="freeze"
                    keyTimes="0; 1"
                    keySplines="0.42 0 0.58 1"  // Smooth cubic-bezier easing
                    calcMode="spline"
                  >
                    <mpath xlinkHref={animationPaths[view]} />
                  </animateMotion>
                </polyline>
              </g>
            </svg>
          </div>
        </>
      )}

      {view === 'projects' ? <Projects /> : view === 'certificates' ? <Certificates /> : <Technologies />}
    </main>
  );
}
