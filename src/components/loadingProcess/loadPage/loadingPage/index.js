import { Helmet } from 'react-helmet'


function LoadingPage() {
   
    return ( 
        <div className="py-0 my-0" id="content">
            <Helmet>
              <title>Loading content..</title>
            </Helmet>
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="py-3 vh-100" data-bgimage="url(images/background/8.jpg) bottom">
                <div id="particles-js"></div>
                    <div className="container">
                        <div className="col-lg-12  top-100">
                            <h1>Loading content..</h1>
                        </div>
                        
                        <div className="col-lg-12  top-100">
                            <h2>The fish you are looking for it on its way out of the Citadef, swimming towards you browser. Please be patient during the swimming process...</h2>
                        </div>
                    </div>
            </section>
            
        </div>
    )
}

export default LoadingPage;