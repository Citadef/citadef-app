import { Helmet } from 'react-helmet'
import Fish from "./fish"

  
function About() {
   
    return ( 
        <div className="py-0 my-0" id="content">
            <Helmet>
              <title>About The Citadef of Fish</title>
            </Helmet>
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="py-5" data-bgimage="url(images/background/8.jpg) bottom">
                <div id="particles-js"></div>
                <div className="v-center py-5">
                    <div className="container">
                        
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">What is Citadef?</span></h2>
                                <p >
                                A wacky .eth blogging democratic autonomous platform
                                </p> 

                                <p>
                                     <ul>
                                        <li> Mint an account to open a blog</li>
                                        <li> Join the community to get a voting right </li>
                                     </ul>
                                </p>
                                
                            </div>
                            <div className="col-md-6 xs-hide">
                                <Fish seed="324243242424" size="400" direction="left"/>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-md-6 xs-hide">
                                <Fish seed="3242432424224324" size="400" direction="right"/>
                            </div>
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">What is a Democratic Autonomous Platform</span></h2>
                                <p >
                                    A democratic Autonomous Platform is a web platform that is operated by its own users (in an autonomous way), and is governed by them in a democratic way.
                                </p>
                                
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">What's the state of the project?</span></h2>
                                <p >
                                    The project is currently in its alpha stage. It's hosted on Polygon network, and anyone can open a blog for life for 1$ (to be paid in $MATIC). Currently the amount of blogs is limited to a 100. 
                                </p> 
                                <p> 
                                    In this phase the blogging system is working, but without images. Governence is still not implemented.
                                </p>

                                
                            </div>
                            <div className="col-md-6 xs-hide">
                                <Fish seed="3243930253242424" size="400" direction="left"/>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-md-6 xs-hide">
                                <Fish seed="324241111880224324" size="400" direction="right"/>
                            </div>
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">Why so Wacky?</span></h2>
                                <p >
                                    Citadef is a fun experiment (with serious concepts!). So we said, i we already have fun, why not have FUNNNN? We used lost of procedurally generated art, wacky design and a silly back story.
                                </p>
                                
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">Are fishes NFTs?</span></h2>
                                <p >
                                    No! Yes! Well, technically yes, but fishes are not NFTs that you are supposed to collcet because they're pretty. It's NFTs that gives you an account in Citadef, we call them WNFTs (website NFTs).
                                </p> 
                                <p>
                                    Basically, you mint an account to open a blog in Citadef. This fish is a symbol of your account, and later of your voting power.
                                </p>

                                
                            </div>
                            <div className="col-md-6 xs-hide">
                                <Fish seed="7242930653242424" size="400" direction="left"/>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-md-6 xs-hide">
                                <Fish seed="374241111880224324" size="400" direction="right"/>
                            </div>
                            <div className="col-md-6">
                                <div className="spacer-single"></div>
                                <h2><span className="text-uppercase">How governence works?</span></h2>
                                <p >
                                    Well, governence don't work yet in this version, but here's how we want it to work.
                                </p>
                                <p>
                                    Each fish holder will get poinst for participating in Citadef. There will be point for publishing articles, points for participating in community calls, be active in Discord or contribute to the development process.
                                </p>
                                <p>
                                   If you have enough points you can ask to join as a member. The final idea is one member = one vote, but we will dive into the memberification process in the future.
                                </p>
                                
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default About;