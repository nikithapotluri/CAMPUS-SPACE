import React from 'react';
import './About.css';

import pic from '../pictures/about-pic.gif';
import female from '../pictures/female.webp'

import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";

function About() {
    let message = `We are a dedicated team focused on transforming how college resources are managed with our cutting-edge space booking system. Our mission is to streamline the process of reserving seminar halls, labs, and auditoriums, making campus life more efficient and organized.

At CampusSpace, we believe that efficient resource management should be simple and hassle-free. Whether you're booking a seminar for a special event, a lab session, or an auditorium for a major presentation, our platform offers intuitive tools and features designed to fit your needs seamlessly.

Our team of experts is committed to providing a user-friendly experience, with real-time availability, easy slot management, and secure login authentication. By utilizing the latest technology and best practices, we ensure that your space booking process is smooth and straightforward.

Thank you for choosing CampusSpace. Let's make every booking process a breeze!`;

    return (

        <div>
            <hr />
        <div className="section-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="section-title text-black pt-5 pb-5">
                            BEHIND CAMPUS SPACE
                        </h2>
                        <div className="section-white">
                            <div className="container">
                                <div className="row align-items-center animate-left">
                                    <div className="col-sm-6 text-black">
                                        <p>Welcome to CampusSpace!</p>
                                        <p className="section-subtitle">{message}</p>
                                    </div>
                                    <div className="col-sm-6 text-center animate-right">
                                        <img src={pic} alt="CampusSpace" className="about-image" style={{'maxWidth':'500px'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="team-item">
                            <img src={female} className="team-img" alt="Rayapudi Sai Roshini" style={{ width: '150px', height: '150px' }} />
                            <div className="team-info">
                                <p style={{'fontStyle':'italic'}}><b>Rayapudi Sai Roshini</b> </p>
                                <p>Passionate web developer committed to creating exceptional websites and web applications that not only look great but perform flawlessly. With expertise in modern web technologies, turn ideas into interactive digital experiences.</p>
                                <ul className="team-icon">
                                    <li>
                                        <a href="https://www.linkedin.com/in/rayapudisairoshini/" className="linkedin" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/rayapudisairoshini" className="github" target="_blank" rel="noopener noreferrer">
                                        <TbBrandGithubFilled />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="team-item">
                            <img src={female} className="team-img" style={{ width: '150px', height: '150px' }} alt="Potluri Nikitha" />
                            <div className="team-info">
                                <p style={{'fontStyle':'italic'}}><b>Potluri Nikitha</b> </p>
                                <p>Innovative web developer dedicated to crafting high-quality websites and applications that deliver both aesthetic appeal and seamless functionality, transforming concepts into dynamic, user-friendly digital solutions.</p>
                                <ul className="team-icon">
                                    <li>
                                        <a href="https://www.linkedin.com/in/nikithapotluri/" className="linkedin" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/nikithapotluri" className="github" target="_blank" rel="noopener noreferrer">
                                        <TbBrandGithubFilled />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
}

export default About;