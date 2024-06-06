import { mySkills } from './myskills';
import './skills.css';

export default function Skills() {
    return (
        <section className='skills'>
            <div className="flex icons-container">
                {mySkills.map((skill) => (
                    <div key={skill.label}>
                        <img src={skill.svg} alt={skill.label} />
                    </div>
                ))}
            </div>
        </section>
    )
}