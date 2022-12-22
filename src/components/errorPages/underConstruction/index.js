import { Helmet } from 'react-helmet'

function UnderConstruction(props) {
   
    return ( 
        <div className="py-0 my-0" id="content">
            <Helmet>
              <title>Under construction</title>
            </Helmet>
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="py-3" data-bgimage="url(images/background/8.jpg) bottom">
                <div id="particles-js"></div>
                    <div className="container">
                        <div className="col-lg-12  top-100">
                            <h1>The {props.title} is still under construction</h1>
                        </div>
                        <div className="col-md-12">
                            <img src="./images/404/under_construction.png" className="img-fluid mx-auto d-block" alt="A fish ready to build"/>
                        </div>
                        <div className="col-lg-12  top-100">
                            <h2> {props.reason} </h2>
                        </div>
                    </div>
            </section>
            
        </div>
    )
}


export default UnderConstruction;