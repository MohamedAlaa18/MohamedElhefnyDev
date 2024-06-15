import './main.css';
import { useState } from 'react';
import { useView } from '../../context/useView';
import Projects from './sections/projects/Projects';
import Certificates from './sections/certificates/Certificates';
import Technologies from './sections/technologies/Technologies';
import TripleToggleSwitch from './components/tripleToggleSwitch/TripleToggleSwitch';

export default function Main({ mainInView }: { mainInView: boolean }) {
  const { view, handleViewChange } = useView();
  const [oldView, setOldView] = useState(view);

  const labels = {
    right: {
      title: "Technologies",
      value: "technologies",
      icon: "icon-gear",
    },
    center: {
      title: "Projects",
      value: "projects",
      icon: "icon-code",
    },
    left: {
      title: "Certificates",
      value: "certificates",
      icon: "icon-atom",
    },
  };

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
      <TripleToggleSwitch labels={labels} />

      {(view === 'projects' || view === 'technologies') && mainInView && (
        <>
          <button
            className={`technologies-toggle flex ${view === 'technologies' && 'active'}`}
            onClick={() => toggleView()}
          >
            <i className={`${view === 'projects' ? 'icon-gear' : 'icon-code'}`} />
          </button>

          <div className="graph_wrapper">
            <svg viewBox="0 0 315 107" version="1.1" style={{ overflow: "visible" }}>
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path id="Path-1" className="path" fill="none" stroke="var(--subtitle)" strokeWidth="4" strokeLinejoin="round" strokeMiterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81" />

                <path className="dashed" fill="none" stroke="var(--secondary)" strokeWidth="8" strokeLinejoin="round" strokeMiterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81" />

                <polyline id="arrow" points="0,-9 18,0 0,9 5,0" fill="var(--subtitle)">
                  <animateMotion rotate="auto" begin="1s" dur="1.6s" repeatCount="1" fill="freeze">
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
