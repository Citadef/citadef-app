import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import {useWindowDimensions} from  "./helpers/sizeUtils"


import Fish from "./fish"

function CardSelecttoMint(props) {
    let fish_size = "";

    const {width} = useWindowDimensions();
    if (width > 992) {
        fish_size = "350";
    }
    else {
        fish_size = "300";
    }

    const history = useHistory();
    const seed = props.seed.toString();
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