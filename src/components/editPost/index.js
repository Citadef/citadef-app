import { useState } from "react";
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from "react-router-dom";

import LoadingModal from "components/helpers/LoadingModal";
import FishPost from "components/mintAndEditFish/formComponents/fishPost";

import {setTokenURI} from "components/contracts/wnftContract"
import { fishPageUrl, loadFish } from "components/helpers/FishUtils";


function EditPost(props) {
    function LoadPost(fish, loaded, setLoaded, postId) {

        // if postID is not given we assume it's a new post
        const isNewPost = postId===undefined || postId===null;

        const post = fish && fish?.posts && fish?.posts[postId]

        if (!isNewPost && post && !loaded) {
            setPostText(post.text);
            setLoaded(true);
        }

        if (!loaded && isNewPost){
            setLoaded(true);
        }

        return [post, isNewPost];
    }

    const [showLoading, setShowLoading] = useState(false);
    const [postText, setPostText] = useState("");
    const [loaded, setLoaded] = useState(false);

    let history = useHistory();

    // load fish and post
    const {postId, seed} = useParams();
    const fish = loadFish(props.fishes, seed);
    let [post, isNewPost] = LoadPost(fish, loaded, setLoaded, postId);

    // set title and header
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
    
        // set new post in fish
        const postIdToChange = isNewPost?updatedPost.publishTime:postId      
        fish.posts[postIdToChange] = updatedPost;

        // publish in ipfs
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

            <Helmet    >
              <title>{pageTitle}</title>
            </Helmet>

            <section id="section-collections" className="top-100">
                <div id="content" className="container">
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <h4>
                                <p>{pageHeader}</p>   
                            </h4>
                        </div>
                        
                    </div>
                </div>
            </section>
            
            <section id="section-collections">
                <div className="container">
                     <FishPost setPost={setPostText} handleClick={handlePublish}  post={postText} loaded={loaded}/>          
                </div>
            </section>
        </div>

                          
    )
}

export default EditPost