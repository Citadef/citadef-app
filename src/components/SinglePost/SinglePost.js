import { marked } from "marked";
import { Helmet } from 'react-helmet'
import { useParams } from "react-router-dom";

import Fish from "../fish"
import EditButton from "./EditButton";
import { publishTimeDisplay, loadFish} from "../helpers/FishUtils"

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

function SinglePost(props) {
    const {seed, post} = useParams();
    const fish = loadFish(props.fishes, seed)

    const postText = fish.posts[post].text;
    const postPublishTime = publishTimeDisplay(fish.posts[post].publishTime);

    const markdownPostText = getMarkdownText(postText);

    return (
<div>
    <Helmet>
        <title>A post by {fish.nick}</title>
    </Helmet>
    <section id="post-header">
        <div id="content" className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-8">
                    <div className="d-flex mb-2">

                        <Fish seed={seed} size="100" direction="right" frame="none"/>

                        <div className="d-flex flex-column ml-auto">
                            <h4 className="pt-3">
                                <p>Post by {fish.nick}</p>
                            </h4>
                            <div className="d-flex flex-row">
                                {postPublishTime}
                                <div className="mx-2"><EditButton seed={seed} walletAddress={props.walletAddress} fishOwners={props.fishOwners} post={post} /></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="post-body">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-8 bg-light border border-dark rounded">
                    <div className="post-body-html" dangerouslySetInnerHTML={markdownPostText} />
                </div>
            </div>
        </div>
    </section>
</div>


    )
}

export default SinglePost;
