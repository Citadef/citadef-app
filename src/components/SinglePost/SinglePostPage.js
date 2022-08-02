import { marked } from "marked";  
import { Helmet } from 'react-helmet'
import Fish from "../fish"
import EditButton from "./EditButton";
import {publishTimeDisplay} from "../helpers/FishUtils"

function getMarkdownText(postText) {
    // take post markdown for fishes object, if object, seed or post doesn't exist, set empty text
    let rawMarkup ="" ;
    try {
        
        const regex = /(\n#|^#)/gi;
        postText = postText.replace(regex, '$1#')
        rawMarkup = marked.parse(postText);
    } catch {

    }
    
    return { __html: rawMarkup };
}

function SinglePostPage(props) {

    const fish = props.fish;
    const postText = fish.posts[props.post].text;
    const postPublishTime = publishTimeDisplay(fish.posts[props.post].publishTime);
    
    const markdownPostText = getMarkdownText(postText);




    return ( 
<div>
    <Helmet>
        <title>A post by {fish.nick}</title>
    </Helmet>
    <section id="post-header" className="pt30 pb30">
        <div id="content" className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-8">
                    <div className="d-flex mb-20">
                        
                        <Fish seed={props.seed} size="100" direction="right" frame="none"/>
                        
                        <div className="d-flex flex-column ml-auto">
                            <h4 className="pt-3">
                                <p>Post by {fish.nick}</p>   
                            </h4>
                            <div className="d-flex flex-row">
                                {postPublishTime}
                                <div className="mx-2"><EditButton seed={props.seed} walletAddress={props.walletAddress} fishOwners={props.fishOwners} post={props.post} /></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="post-body" className="pt30 pb30">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 bg-light">
                    <div className="post-body-html" dangerouslySetInnerHTML={markdownPostText} />
                </div>
            </div>            
        </div>
    </section>
</div>

                          
    )
}

export default SinglePostPage;
