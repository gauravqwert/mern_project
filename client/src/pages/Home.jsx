export const Home = () => {
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>This is My First Mern Project</p>
                            <h1>Welcome to Mern Project</h1>
                            <p>
                                We create first time for using a mern stack project.
                                We can create a website using React,nodejs,Express.js 
                                and backened with MongoDB and also use for testing a 
                                API using Postman App .  
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

                        {/* hero images */}
                        <div className="hero-images">
                            <img src="/images/home.png" alt="home_img" width="400" height="500" />
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


            {/* 3rd section */}
            <section className="section-hero">
                    <div className="container grid grid-two-cols">

                    <div className="hero-images">
                            <img src="/images/about.png" alt="home_img" width="400" height="500" />
                        </div>

                        <div className="hero-content">
                           <p>We are here to help you</p>
                           <h1>Get Started Today</h1>
                           <p>
                            Ready to take the first step towards and for creating a mern stack project for free ideas and solution with us and we provide a free and open environment to ask a question related to the project or anythings.
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

                       
                       
                    </div>
                </section>

            {/* 3rd section end */}


        </>
    );
};

