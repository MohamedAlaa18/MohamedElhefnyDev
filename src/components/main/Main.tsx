import Certificates from './certificates/Certificates';
import Projects from './projects/Projects';
import './main.css'
import { useView } from '../viewContext/useView';

function Main() {

  const { view, handleViewChange, toggleCheckBox } = useView();

  return (
    <main className="flex">
      <div className="flex toggle-container-header">
        <label className="toggle-container">
          <input ref={toggleCheckBox} type="checkbox" className="toggle-input" onChange={() => handleViewChange(view == 'projects' ? 'certificates' : 'projects')} />
          <span className="toggle-slider"></span>
          <div className="text-projects"><span>Projects</span><span className="icon-code" />&nbsp;</div>
          <div className="text-certificates"><span className="icon-atom" /><span>Certificates</span></div>
        </label>
      </div>

      {view === 'projects' ? <Projects /> : <Certificates />}
    </main >
  )
}

export default Main