import { Helmet } from 'react-helmet'
  
function Error404() {
   
    return ( 
        <div className="py-0 my-0" id="content">
            <Helmet>
              <title>404 error: No fish here!</title>
            </Helmet>
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="py-3 vh-100" data-bgimage="url(images/background/8.jpg) bottom">
                <div id="particles-js"></div>
                    <div className="container">
                        <div className="col-lg-12  top-100">
                            <h1>404 error: no fish here!</h1>
                        </div>
                        <div className="col-md-12">
                            <img src="./images/404/no_fish.png" className="img-fluid mx-auto d-block" alt=""/>
                        </div>
                        <div className="col-lg-12  top-100">
                            <h2>The page you are looking for does not exists or you have no access right to it. Maybe connecting to a wallet would help?</h2>
                        </div>
                    </div>
            </section>
            
        </div>
    )
}

export default Error404;