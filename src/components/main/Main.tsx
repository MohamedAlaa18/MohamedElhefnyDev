import Certificates from './certificates/Certificates';
import Projects from './projects/Projects';
import './main.css';
import { useView } from '../../context/useView';
import TripleToggleSwitch from './TripleToggleSwitch/TripleToggleSwitch';
import Technologies from '../technologies/Technologies';

function Main() {
  const { view } = useView();

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

  return (
    <main className="flex">
      <TripleToggleSwitch labels={labels} />

      {view === 'projects' && <Projects />}
      {view === 'certificates' && <Certificates />}
      {view === 'technologies' && <Technologies />}
    </main>
  );
}

export default Main;
