import { useParams, Link } from "react-router-dom";
import { Helmet } from 'react-helmet'

import Fish from "./fish";
import PostCard from "./postCard";
import {LoadPage, ownThisFish, EMPTYFISH} from "./loadingProcess";
  

function FishPersonalPage(props) {
    const fishes = props.fishes;
    const fish = loadFish(fishes);

    function loadFish(fishes) {
        let newFish;

        if (props.seed in fishes)  
            newFish = fishes[props.seed];
        else {
            newFish =  EMPTYFISH;
        }

        return newFish;
    }

    function newPostButton() {

        if (ownThisFish(props.seed, props.walletAddress, props.fishOwners)) {
            let link = "/#/personal/new/" + props.seed;

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
           const post = posts[i];
           let thumbnail = "thumbnail" + i.toString() + ".png";
           
           postObjs.push(<PostCard postId={post[0]} key={i} post={post[1]} thumbnail = {thumbnail}
                       seed={props.seed} walletAddress={props.walletAddress} fishOwners={props.fishOwners} />);
        }

        return (
            <div className="row">
                {postObjs}
            </div>
        )
    }

    const editButton = () => {
        if (ownThisFish(props.seed, props.walletAddress, props.fishOwners)) {
            
            return (
                <div className="edit-fish"><Link to={"/personal/edit/" + props.seed }>
                    <img src="./images/blog/edit.svg" className="" />
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
        <section id="section-collections" className="pt30 pb30 top-100">
            <div id="content" className="container">
                <div className="row">
                    <div className="col-md-8">
                       <div >
                            <div>
                                <div className="profile_avatar">
                                    <div>
                                        <div className="mb-20">
                                            <h4>
                                                <p>Personal fish space</p>                                                
                                            </h4>
                                            <h1 className="mb0">
                                            {fish.nick}
                                            </h1>
                                            #{fish.seed}
                                        </div>
                                        {editButton()}
                                        <div>
                                            <p>{fish.desc}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
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
            
                <section id="section-collections" className="pt30 pb30">
                    <div className="container">
                        {FishPosts()}            
                    </div>
                </section>
            </div>

                          
    )
}

function FishPersonal(props) {
    const {seed} = useParams();

    return (
        <LoadPage fishes={props.fishes} seed={seed} post={false} access={false} 
          page={<FishPersonalPage seed={seed} fishes={props.fishes} ownFish={props.ownFish} walletAddress={props.walletAddress} fishOwners={props.fishOwners}/>} />
    )
}

export default FishPersonal;