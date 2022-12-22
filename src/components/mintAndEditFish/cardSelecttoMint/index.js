import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import Fish from "components/fish"

import {useWindowDimensions} from  "components/helpers/sizeUtils"

function CardSelecttoMint(props) {
    const history = useHistory();
    const seed = props.seed.toString();

    const {width} = useWindowDimensions();
    const fish_size = width > 992 ? "350" : "300"
    const mint_link = "/mint/details/" + seed;

    function handleClick(id) {
        history.push(mint_link);
    }

   
    return ( 

        <div className="col-md-12 col-lg-4">
            <div className="WNFT-mainpage"> 
                <div className="WNFT-mainpage-img">
                    <Link to={mint_link}>
                        <Fish seed={seed} size={fish_size}/>
                    </Link>
                </div>
                <div className="WNFT-mainpage-desc">
                    <h4> #{seed} </h4>
                    <button type="button" className="btn btn-primary btn-select-mint" onClick={handleClick}>Select</button>                

                </div>
           </div>
        </div>

    )
}

export default CardSelecttoMint;