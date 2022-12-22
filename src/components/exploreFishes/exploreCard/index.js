import { useHistory, Link } from "react-router-dom";

import Fish from "components/fish"

function ExploreCard(props) {
    const history = useHistory();
    const personal_page = "/personal/" + props.seed;

    function handleClick(id) {
        history.push(personal_page);
      }


    const numPosts = props?.posts && Object.keys(props.posts).length

    return ( 
   
        <div className={props.col}>
            <div className="WNFT-mainpage w-auto">
                <div className="WNFT-mainpage-img" onClick={handleClick}>
                     <Fish seed={props.seed} size={props.size} direction={props.direction}/>
                </div>
                <div className="WNFT-mainpage-desc">
                    <Link to={personal_page}><h4> {props.nick} </h4></Link>
                    {/*<div className="WNFT-mainpage-moreinfo">  </div>*/}
                    <div className="WNFT-mainpage-score">#{props.seed} </div>
                    <div className="WNFT-mainpage-buyorbid"> Posts: </div>
                    <div className="WNFT-mainpage-num"> {numPosts} </div>

                </div>
            </div>
        </div>

    )
}

export default ExploreCard;