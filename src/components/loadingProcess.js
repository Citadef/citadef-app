import { Helmet } from 'react-helmet'

const EMPTYFISH = {"posts": [], "nick": "", "seed": "000", "disc": ""}
  
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
                            <h1 className="style-2">404 error: no fish here!</h1>
                        </div>
                        <div className="col-md-12">
                            <img src="./images/404/no_fish.png" className="img-fluid mx-auto d-block" alt=""/>
                        </div>
                        <div className="col-lg-12  top-100">
                            <h2 className="style-2">The page you are looking for does not exists or you have no access right to it. Maybe connecting to a wallet would help?</h2>
                        </div>
                    </div>
            </section>
            
        </div>
    )
}

function Loading() {
   
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
                            <h1 className="style-2">Loading content..</h1>
                        </div>
                        
                        <div className="col-lg-12  top-100">
                            <h2 className="style-2">The fish you are looking for it on its way out of the Citadef, swimming towards you browser. Please be patient during the swimming process...</h2>
                        </div>
                    </div>
            </section>
            
        </div>
    )
}

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
                            <h1 className="style-2">The {props.title} is still under construction</h1>
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


function ownThisFish(seed, walletAddress, fishOwner) {
    let res = false;

    if (walletAddress in fishOwner) 
        if (seed in fishOwner[walletAddress]) 
            if (fishOwner[walletAddress][seed])
                res = true;

    return res;
}

/**
 * Handle loading a page proecesss
 * @param props; includes fishes, seed, post (null or int), access (if page is accessible only for owner), 
 *                        walletAddress, fishOwners and page (page component to load if everything is ok)
 */
function LoadPage(props) {
    // no fishes yet? then we must still be loading
    if (props.fishes.length == 0)
        return (<Loading/>);

    // fish doesn't exists
    if (!(props.seed in props.fishes))
        return (<Error404/>)

    // user asks for a post that doesn't exist
    if (props.post && !(props.post in props.fishes[props.seed].posts))
        return (<Error404/>)

    // check access
    if (props.access) {
        if (!(props.walletAddress in props.fishOwners))
            return (<Error404/>)
        
        if (!(props.seed in props.fishOwners[props.walletAddress])) 
            return (<Error404/>)
    }

    return (<>{props.page}</>)

}

export {LoadPage, Error404, UnderConstruction, Loading, ownThisFish, EMPTYFISH};