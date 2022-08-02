import { Helmet } from 'react-helmet'
  
function LandingScreen() {
   
    return ( 
        <div className="py-0 my-0" id="content">
            <Helmet>
              <title>Citadef - The Citadef of Fish</title>
            </Helmet>
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="vh-100" data-bgimage="url(images/background/8.jpg) bottom">

                <div id="particles-js"></div>
                <div className="v-center">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 text-center text-lg-start">
                                <div className="spacer-single"></div>
                                <h6 ><span className="text-uppercase id-color-2">The Citadel of Fishes</span></h6>
                                <div className="spacer-10"></div>
                                <div className="d-none d-lg-block"> <h1 >.eth blogging platform</h1> </div>
                                <div className="d-lg-none"> <h3 >A .eth blogging platform</h3> </div>
                                <div className="d-none d-lg-block">
                                    Mint an account to get:
                                    <div>
                                         <ul>
                                            <li> Your own .eth blog in Citadef</li>
                                            <li> A vote in the Citadef council </li>
                                            <li> A wacky fish to represent your profile  </li>
                                         </ul>
                                    </div>
                                    <a href="/#/about">Read more</a>
                                </div>
                                <div className="d-lg-none"> 
                                    <img src="./images/landing/fish-showcase1-small.png" className="img-fluid" alt=""/>
                                </div>
                                <div className="spacer-10"></div>
                                <a href="/#/mint/select" className="btn-main">Mint an account</a>
                                <div>(An account costs 1$ in MATIC, and is minted on Polygon)</div>
                                
                            </div>
                            <div className="col-lg-6 d-none d-lg-block">
                                <img src="./images/landing/fish-showcase1.png" className="img-fluid" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default LandingScreen;