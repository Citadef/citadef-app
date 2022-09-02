import { useHistory } from "react-router-dom";

import FishCards from "./FishCards/FishCards";
import PostCardMainpage from "./postCardMain";
import {latestPosts} from  "./helpers/FishUtils";
import {useWindowDimensions} from  "./helpers/sizeUtils";


const HOME_PAGE_MAX_FISH_SHOW = 5


function Citadef(props) {
    let {width} = useWindowDimensions();
    var fish_size = "400"
    if (width > 992) 
        fish_size = "600";
    

    const history = useHistory();

    const routeExplore = () =>{ 
        history.push("/explore");
      }

    var latest_posts = "";

    if (Object.keys(props.fishes).length > 0) {
        latest_posts = latestPosts(props.fishes);
        latest_posts.splice(HOME_PAGE_MAX_FISH_SHOW, latest_posts.length)
    }


    function TempCard(props) {
            const fishes_keys = Object.keys(props.fishes);
            const latest_posts_keys = Object.keys(props.latest_posts);
            let fish_cards = [];
            let next_post_direction = "right";

        if (fishes_keys.length > 0) {
            for (let i=0; i<latest_posts_keys.length; i++) {
                let current_post_fish_seed = props.latest_posts[i][0];
                let current_post_id = props.latest_posts[i][1];
                fish_cards.push(<PostCardMainpage nick={props.fishes[current_post_fish_seed].nick}  
                                                    seed={props.fishes[current_post_fish_seed].seed} 
                                                    key={props.fishes[current_post_fish_seed].seed} 
                                                    posts={props.fishes[current_post_fish_seed].posts} 
                                                    post={props.fishes[current_post_fish_seed].posts[current_post_id]} 
                                                    col="col-md-12" 
                                                    size={fish_size} direction={next_post_direction}/>);

                // change direction for next post
                next_post_direction = next_post_direction == "right" ? "left" : "right" 
            }

            return (
                <>
                    {fish_cards}
                </>
                );
        } else {
            return (<></>);
        }
    } 

    return ( 
         <section id="section-collections" className="pt30 pb30">
                <div className="container relative-position">
                    <div className="col-lg-12 top-100">
                        <h2 className="style-2">The Citadef Council: {props.minted} members. Last {HOME_PAGE_MAX_FISH_SHOW} posts: </h2>
                    </div>
                    <div className="bg-main-middle-left d-none d-lg-block"></div>
                    <div className="bg-main-middle-right d-none d-lg-block"></div>
                    <TempCard fishes = {props.fishes} latest_posts={latest_posts}/>

                    <div className="text-center"> 
                        <button type="button" className="btn btn-primary btn-select-showmore" onClick={routeExplore}>
                            Swim with the fishes
                        </button>
                    </div>
                </div>
            </section>
    )
}

export default Citadef;