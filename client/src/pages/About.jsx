import {NavLink} from "react-router-dom";
import { useAuth } from "../store/auth";
export const About = () => {
    const {user} = useAuth();
    return (
        <>
            <main>
            <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                           <p>Welcome,
                           {user ? ` ${user.username} to our website` : `to our website`}</p>
                           <p>We are here to help you</p>
                           <h1>Get Started Today</h1>
                           <p>
                            Ready to take the first step towards and for creating a mern stack project for free ideas and solution with us and we provide a free and open environment to ask a question related to the project or anythings.
                           </p>
                           <p>
                           The MERN stack is a popular choice for building modern web applications because it allows you to quickly and easily develop and deploy full-stack web apps. It is an open-source framework that uses JavaScript and JSON to create a three-tier architecture. 
                           </p>
                            <div className="btn btn-group">
                                <a href ="/contact">
                                    <button className="btn">Connect now</button>
                                </a>

                                <a href ="/service">
                                    <button className="btn secondary-btn">Learn now</button>
                                </a>
                            </div>
                        </div> 
                        <div className="hero-images">
                            <img src="/images/about1.png" alt="home_img" width="400" height="500" />
                        </div>    
                    </div>
                </section> 
            </main>

            {/* 2nd section */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>5+</h2>
                        <p>Mern Projects</p>
                    </div>
                    <div className="div1">
                        <h2>50 +</h2>
                        <p>Mern Students</p>
                    </div>
                    <div className="div1">
                        <h2>100 +</h2>
                        <p>Backened Projects</p>
                    </div>
                    <div className="div1">
                        <h2>1000+</h2>
                        <p>Happy Students</p>
                    </div>
                </div>
            </section>
            {/* 2nd section end */}
        </>
    );
};

