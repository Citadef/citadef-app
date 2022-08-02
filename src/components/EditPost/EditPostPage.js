import { useState } from "react";
import { Helmet } from 'react-helmet'

import LoadingModal from "../helpers/LoadingModal";
import {setTokenURI} from "../WnftContract/WnftContract"
import FishPost from "./FishPost.js";
import { useHistory } from "react-router-dom";

import { fishPageUrl } from "../helpers/FishUtils";


function EditPostPage(props) {
    const [showLoading, setShowLoading] = useState(false);


    const [postText, setPostText] = useState("");
    const [loaded, setLoaded] = useState(false);

    let history = useHistory();

    const fish = props.fish;
    const postId = props.post;

    const post = fish && fish?.posts && fish?.posts[postId]

    const isNewPost = props.post===undefined || props.post===null;


    if (!isNewPost && post && !loaded) {
        setPostText(post.text);
        setLoaded(true);
    }

    if (!loaded && isNewPost){
        setLoaded(true);
    }

    const pageTitle = isNewPost?("Writing a new post by " + fish.nick):("Editing post " + postId + " of " + fish.nick)

    const pageHeader = isNewPost?("New post by " + fish.nick):("Edit post by " + fish.nick)



    const handlePublish = () => {

        setShowLoading(true);
        // prepare post object
        let updatedPost = post?{...post}:{};
        updatedPost.text = postText;
        updatedPost.editTime = 0;
        if(!updatedPost.publishTime){
            updatedPost.publishTime = Date.now();
        }else{
            updatedPost.editTime = Date.now();
        }

        if (fish?.posts===undefined) { 
            fish.posts = {};
        }
    
        const postIdToChange = isNewPost?updatedPost.publishTime:postId
      
        fish.posts[postIdToChange] = updatedPost;

        //const client = create(CITADEF_IPFS_NODE);
        props.ipfs.add(JSON.stringify(fish)).then((cid) => {
            const tokenUri = (!cid.path.startsWith('ipfs://') && 'ipfs://' + cid.path) || cid.path

            setTokenURI(props.NFTWWithSigner, props.seed, tokenUri).then(()=> 
            {
                history.push(fishPageUrl(props.seed))
                setShowLoading(false)
            });
        });
    }
    

    return ( 
        <div>
            <LoadingModal show={showLoading} />
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <section id="section-collections" className="pt30 pb30 top-100">
            <div id="content" className="container">
                <div className="row d-flex">
                    <div className="col-md-6 d-flex">
                       <div >
                            <div>
                                <div className="profile_avatar d-flex">
                                    <div>
                                        <div className="mb-20">
                                            <h4>
                                                <p>{pageHeader}</p>   
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            </section>
            
                <section id="section-collections" className="pt30 pb30">
                    <div className="container">
                         <FishPost setPost={setPostText} handleClick={handlePublish}  post={postText} loaded={loaded}/>          
                    </div>
                </section>
            </div>

                          
    )
}

export default EditPostPage