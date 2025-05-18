import Image from 'next/image';
import { useEffect } from 'react';

const Resume = () => {
    useEffect(() => {
        const skillBars = document.querySelectorAll<HTMLLIElement>('.skills-prog li');
        skillBars.forEach((li, i) => {
            const percent = li.getAttribute('data-percent');
            if (!percent) return;

            const bar = li.querySelector('.skills-bar .bar') as HTMLElement | null;
            if (!bar) return;

            setTimeout(() => {
                bar.style.width = `${percent}%`;
                bar.style.transitionDuration = '0.5s';
            }, i * 150);
        });

        const softSkills = document.querySelectorAll<HTMLLIElement>('.skills-soft li');
        softSkills.forEach((li, i) => {
            const percentStr = li.getAttribute('data-percent');
            if (!percentStr) return;

            const percent = parseInt(percentStr, 10);
            const circle = li.querySelector('circle.cbar') as SVGCircleElement | null;
            const label = li.querySelector('small') as HTMLElement | null;

            if (!circle || !label) return;

            const r = Number(circle.getAttribute('r'));
            const c = Math.PI * (r * 2);
            const offset = ((100 - percent) / 100) * c;

            circle.style.strokeDashoffset = c.toString();
            circle.style.strokeDasharray = c.toString();

            setTimeout(() => {
                circle.style.strokeDashoffset = offset.toString();
                circle.style.transitionDuration = '0.3s';

                let counter = 0;
                const increment = () => {
                    if (label && counter <= percent) {
                        label.textContent = `${Math.ceil(counter)}%`;
                        counter++;
                        setTimeout(increment, 1000 / percent);
                    }
                };
                increment();
            }, i * 150);
        });
    }, []);

    return (
        <div className="resume">
            <div className="base">
                <div className="profile">
                    <div className="photo">
                        <Image height={100} width={100} src="Mohamed El Hefny.png" alt="Profile" />
                    </div>
                    <div className="info">
                        <h4 className="name">Mohamed El Hefny</h4>
                        <small className="job">Front-end Developer</small>
                    </div>
                </div>
                <div className="about">
                    <h3>About me</h3>
                    <p>I am Mohamed El Hefny, a front-end developer who loves building dynamic, high-performance web applications. I excel at Angular, React, and Next.js for creating seamless and interactive user experiences. I have done a great job in creating scalable solutions to meet business and user requirements. My skills cover modern front-end technologies that make the applications efficient and engaging I seek to build effective and beneficial solutions with a lot of efficiency.</p>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <div className="call"><i className="fa fa-phone"></i><span>(+20)1090528591</span></div>
                    <div className="address"><i className="fa fa-map-marker"></i><span>Cairo, Egypt</span></div>
                    <div className="email"><i className="fa fa-envelope"></i><span>mohamed.alaa.elhefny@gmail.com</span></div>
                </div>
                <div className="follow">
                    <h3>Follow</h3>
                    <div className="box">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="pif-plurkapp"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-pinterest-p"></i></a>
                        <a href="#"><i className="fa fa-tumblr"></i></a>
                    </div>
                </div>
            </div>

            <div className="func">
                <div className="work">
                    <h3><i className="fa fa-briefcase"></i>Work Experience</h3>
                    <ul>
                        <li><span>EOC Developer</span><small>Sep 2024 - Present</small></li>
                        <li><span>Front-end Developer</span><small>Jul 2024 - Apr 2025</small></li>
                        <li><span>JavaScript Developer</span><small>Oct 2022 - Sep 2024</small></li>
                    </ul>
                </div>
                <div className="edu">
                    <h3><i className="fa fa-graduation-cap"></i>Education</h3>
                    <ul>
                        <li><span>Diploma in .NET Full Stack Web Development</span><small>Jan 2024 - May 2024</small></li>
                        <li><span>Nanodegree in React Cross-Skilling</span><small>Feb 2022 - Mar 2022</small></li>
                        <li><span>Nanodegree in Advanced Full-Stack Development</span><small>Dec 2021 - Feb 2022</small></li>
                        <li><span>Nanodegree in Front-End Web Development</span><small>Jul 2021 - Sep 2022</small></li>
                        <li><span>B.CS in Computer science</span><small>Oct 2016 - Jul 2020</small></li>
                    </ul>
                </div>
                <div className="skills-prog">
                    <h3><i className="fa fa-code"></i>Programming Skills</h3>
                    <ul>
                        {[
                            ['HTML5', 99],
                            ['CSS3 & SASS', 99],
                            ['Tailwind & Bootstrap', 99],
                            ['TypeScript & JavaScript', 92],
                            ['Angular', 95],
                            ['Next.js & React.js', 90],
                            ['Redux & NgRx', 90],
                            ['MUI & Angular Material', 95],
                            ['Git & GitHub', 90],
                            ['REST API', 90],
                            ['PUG.js & Gulp.js', 95],
                            ['jQuery', 80],
                            ['Figma', 50],
                            ['C# & OOP', 75],
                            ['.NET', 50],
                            ['MySQL', 50]
                        ].map(([name, percent]) => (
                            <li key={name} data-percent={percent}>
                                <span>{name}</span>
                                <div className="skills-bar">
                                    <div className="bar"></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="skills-soft">
                    <h3><i className="fa fa-th-list"></i>Software Skills</h3>
                    <ul>
                        {[
                            ['VS Code', 94],
                            ['Postman', 80],
                            ['Github', 89],
                            ['Circleci', 55],
                            // ['Adobe Animate', 55]
                        ].map(([name, percent]) => (
                            <li key={name} data-percent={percent}>
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45"></circle>
                                    <circle className="cbar" cx="50" cy="50" r="45"></circle>
                                </svg>
                                <span>{name}</span>
                                {/* <small></small> */}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className="interests">
                    <h3><i className="fa fa-star"></i>Interests</h3>
                    <div className="interests-items">
                        <div className="draw"><i className="fa fa-paint-brush"></i><span>Draw</span></div>
                        <div className="guitar"><i className="fa fa-music"></i><span>Guitar</span></div>
                        <div className="movie"><i className="fa fa-film"></i><span>Movie</span></div>
                        <div className="music"><i className="fa fa-headphones"></i><span>Music</span></div>
                        <div className="game"><i className="fa fa-gamepad"></i><span>Game</span></div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Resume;