import { Link } from "react-router-dom";

import PostCardMainpage from "components/postCardMain";
import {latestPosts} from  "components/helpers/FishUtils";
import {useWindowDimensions} from  "components/helpers/sizeUtils";

const HOME_PAGE_MAX_FISH_SHOW = 5;
const SMALL_FISH = "400";
const BIG_FISH = "600";

function Citadef(props) {
    let {width} = useWindowDimensions();

    function fishSize() {
        let fish_size = SMALL_FISH;
        if (width > 992) 
            fish_size = BIG_FISH;

        return fish_size;
    }

    function getLatestPosts(fishes) {
        var latest_posts = "";

        if (Object.keys(fishes).length > 0) {
            latest_posts = latestPosts(fishes);
            latest_posts.splice(HOME_PAGE_MAX_FISH_SHOW, latest_posts.length);
        }

        return latest_posts;
    }


    function FishPostCards(props) {
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
                                                    size={fishSize()} direction={next_post_direction}/>);

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
         <section id="section-collections">
                <div className="container relative-position">
                    <div className="col-lg-12 top-100">
                        <h2>The Citadef Council: {props.minted} members. Last {HOME_PAGE_MAX_FISH_SHOW} posts: </h2>
                    </div>
                    <div className="bg-main-middle-left d-none d-lg-block"></div>
                    <div className="bg-main-middle-right d-none d-lg-block"></div>
                    <FishPostCards fishes = {props.fishes} latest_posts={getLatestPosts(props.fishes)}/>

                    <div className="text-center"> 
                        <Link to="/explore">
                            <button type="button" className="btn btn-primary btn-citadef">
                                Swim with the fishes
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
    )
}

export default Citadef;