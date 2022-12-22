import { useHistory, Link } from "react-router-dom";
import { marked } from "marked";  

import ownThisFish from "components/loadingProcess/ownThisFish";
import { publishTimeDisplay } from "components/helpers/FishUtils"

function PostCard(props) {
    const post_page = "/personal/post/" + props.seed + "/" + props.postId;
    const history = useHistory();

    function handleClick() {
        history.push("/personal/post/" + props.seed + "/" + props.postId);
    }

    function getThumbnailURL() {
        return "../images/post_thumbnails/" + props.thumbnail;
    }

    function getMarkdownText() {
        // remove heading, we don't want headings in abstract
        let postText = props.post.text.replace(/#/g,'');

        // break the textblock into an array of lines
        var lines = postText.split('\n');
        // remove one line, starting at the first position
        lines.splice(0,1);
        // join the array back into a single string
        var post = lines.join('\n');

        var rawMarkup = marked.parse(post);
        return { __html: rawMarkup };
    }

    function getHeader() {
        // get first line from the post
        var firstLine = props.post.text.split('\n')[0];

        // remove the #
        firstLine = firstLine.substring(1);

        return firstLine;
    }

    function editButton() {
        if (ownThisFish(props.seed, props.walletAddress, props.fishOwners)) {
            
            return (
                <Link to={"/personal/post/edit/" + props.seed + "/" + props.postId}>
                    <img src="./images/blog/edit.svg" className="button-svg w-20" />
                </Link>
            )
        } else {
            return (<></>)
        }
    }

    const postPublishTime = publishTimeDisplay(props.post.publishTime)
   
    return ( 
   
        <div className="row mb-5">
            <div className="col-md-1">
            </div>
            <div className="col-md-3">
            <div> {postPublishTime}</div>
            <img alt="" src={getThumbnailURL()} />
            </div>
            <div className="col-md-7">
                <Link to={post_page}>
                    <h3 className="post-summary-title"> {getHeader()} </h3>
                </Link>
                <div className="post-abstract" dangerouslySetInnerHTML={getMarkdownText()} />
                <div className="position-relative">
                {editButton()}
                <Link to={post_page}>
                    <div className="pt-2 mt-2 link-dark">
                        <b> Read more {'\u279E'} </b>
                    </div>
                </Link>
                </div>
            </div>
        </div>

    )
}

export default PostCard;