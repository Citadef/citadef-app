import { useParams, Link } from "react-router-dom";
import { Helmet } from 'react-helmet'

import Fish from "components/fish";
import PostCard from "components/postCard";
import EMPTYFISH from "components/errorPages/emptyFish";
import ownThisFish from "components/loadingProcess/ownThisFish";

import 'components/fishPersonal/fishPersonal.css';


function FishPersonal(props) {
    const {seed} = useParams();

    const fishes = props.fishes;
    const fish = loadFish(fishes);

    function loadFish(fishes) {
        let newFish;

        if (seed in fishes)  
            newFish = fishes[seed];
        else {
            newFish =  EMPTYFISH;
        }

        return newFish;
    }

    function newPostButton() {

        if (ownThisFish(seed, props.walletAddress, props.fishOwners)) {
            let link = "/#/personal/new/" + seed;

            return (
                <div className="col-md-4">
                    <p>
                        <a href={link} className="btn-main">New Post</a> 
                    </p>
                </div>
            )
        } else {
            return (<></>)
        }
    }


    function FishPosts() {
        let postObjs = [];

        let posts = [];
  
        for (const [key, value] of Object.entries(fish.posts||{})) {
             posts.push([key, value])

        }

        for (let i=(posts.length-1);i>=0;i--){
            let thumbnail_id = (i%5).toString();

           const post = posts[i];
           let thumbnail = "thumbnail" + thumbnail_id.toString() + ".png";
           
           postObjs.push(<PostCard postId={post[0]} key={i} post={post[1]} thumbnail = {thumbnail}
                       seed={seed} walletAddress={props.walletAddress} fishOwners={props.fishOwners} />);
        }

        return (
            <div className="row">
                {postObjs}
            </div>
        )
    }

    const editButton = () => {
        if (ownThisFish(seed, props.walletAddress, props.fishOwners)) {
            
            return (
                <div className="edit-fish"><Link to={"/personal/edit/" + seed }>
                    <img src="./images/blog/edit.svg" />
                </Link>
                </div>
            )
        } else {
            return (<></>)
        }
    }

   
    return ( 
        <div>
        <Helmet>
          <title>Personal Space of {fish.nick}</title>
        </Helmet>
        <section id="section-collections">
            <div id="content" className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="mb-2">
                            <h4>
                                <p>Personal fish space</p>                                                
                            </h4>
                            <h1 className="mb-0">
                            {fish.nick}
                            </h1>
                            #{fish.seed}
                        </div>

                        {editButton()}

                        <div>
                            <p>{fish.desc}</p>

                        </div>
                    </div>

                    <div className="col-md-4">
                       <div className="d_profile de-flex">
                            <div className="de-flex-col">
                                <div className="profile_avatar">
                                    <Fish seed={fish.seed} size="300" direction="left"/>
                                    <div className="profile_name">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h2> Latest Articles </h2>
                    </div>
                    {newPostButton()}
                    <hr className="solid"/>
                </div>
            </div>
            </section>
            
                <section id="section-collections">
                    <div className="container">
                        {FishPosts()}            
                    </div>
                </section>
            </div>

                          
    )
}

export default FishPersonal;