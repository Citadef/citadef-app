import { Helmet } from 'react-helmet'
import { useParams } from "react-router-dom";

import LoadingPage from 'components/loadingProcess/loadPage/loadingPage'
import Error404 from 'components/errorPages/error404'


/**
 * Handle loading a page proecesss
 * @param props; includes fishes, seed, post (null or int), access (if page is accessible only for owner), 
 *                        walletAddress, fishOwners and page (page component to load if everything is ok)
 */
function LoadPage(props) {
    // get seed from url parameters
    const {seed, post} = useParams();

    // no fishes yet? then we must still be loading
    if (props.fishes.length == 0)
        return (<LoadingPage/>);

    // fish doesn't exists
    if (!(seed in props.fishes))
        return (<Error404/>)

    // user asks for a post that doesn't exist
    if (post && !(post in props.fishes[seed].posts))
        return (<Error404/>)

    // check access
    if (props.access) {
        if (!(props.walletAddress in props.fishOwners))
            return (<Error404/>)
        
        if (!(seed in props.fishOwners[props.walletAddress])) 
            return (<Error404/>)
    }

    return (<>{props.page}</>)

}

export default LoadPage;