import Projects from './sections/projects/Projects';
import Certificates from './sections/certificates/Certificates';
import Technologies from './sections/technologies/Technologies';
import TripleToggleSwitch from './components/tripleToggleSwitch/TripleToggleSwitch';
import { useView } from '../../context/useView';
import './main.css'
import { useState } from 'react';

export default function Main() {
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
  }

  return (
    <main className="flex">
      {
        (view === 'projects' || view === 'technologies') &&
        <button className={`technologies-toggle flex ${view === 'technologies' && 'active'}`} onClick={() => toggleView()}>
          <i className={`${view === 'projects' ? 'icon-gear' : 'icon-code'}`} />
        </button>
      }

      <TripleToggleSwitch labels={labels} />

      {view === 'projects' ? <Projects /> : view === 'certificates' ? <Certificates /> : <Technologies />}
    </main>
  );
}
