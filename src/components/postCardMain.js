import { useHistory, Link } from "react-router-dom";
import { marked } from "marked";  
import {ownThisFish} from "./loadingProcess";
import {publishTimeDisplay} from "./helpers/FishUtils"

import Fish from "./fish"

function PostCardMainpage(props) {
    const history = useHistory();
    const personal_page = "/personal/" + props.seed;
    const post_page = "/personal/post/" + props.seed + "/" + props.post.publishTime;

    function handleClick(id) {
        history.push(personal_page);
    }

     function getThumbnailURL() {
        return "../images/post_thumbnails/" + props.thumbnail;
    }

    function getPostHeight() {
        if (props.size == "400") 
            return "post-mainpage-backgronud h-100"
        else 
            return "post-mainpage-backgronud h-600"
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

    function FishColumn(props) {
        return(
            <div className="col-md-6">
                <div className="WNFT-mainpage-img d-flex justify-content-center" onClick={handleClick}>
                     <Fish seed={props.seed} size={props.size} direction={props.direction} frame="none"/>
                </div>
            </div>
        )
    }


    const postPublishTime = publishTimeDisplay(props.post.publishTime);

    return ( 
   
        <div className="WNFT-mainpage w-auto">
        <div className={props.col}>
                <div className="row align-items-center d-flex justify-content-center">
                    {props.direction == "right"? <FishColumn seed={props.seed} size={props.size} direction={props.direction}/> : null}

                    <div className="col-md-6 post-mainpage-background">
                    <div className={getPostHeight()}>
                        <h3 className="blacklink"> 
                            <Link to={personal_page}> {props.nick}</Link>
                        </h3>
                        <h3 className="post-summary-title bluelink">
                            <Link to={post_page}> {getHeader()} </Link>
                        </h3>
                        <div className="publishDatePost bluelinks"> {postPublishTime} by <span style={{fontWeight: 'bold'}}><Link to={personal_page}> {props.nick}</Link></span></div>
                        <div className="post-abstract" dangerouslySetInnerHTML={getMarkdownText()} />
                        <div className="position-relative">
                            <div className="bluelink pt-2 mt-2">
                                <Link to={post_page}> <b> Read more {'\u279E'} </b></Link>
                            </div>
                        </div>
                    </div>
                    </div>

                    {props.direction == "left"? <FishColumn seed={props.seed} size={props.size} direction={props.direction}/> : null}
                </div>
            </div>
        </div>

    )
}

export default PostCardMainpage;