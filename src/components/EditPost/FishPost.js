import { useMemo } from "react";
import { marked } from "marked";  


function hidePosts(loaded) {
    if (!loaded)
        return "row invisible"
    else
        return "row"
}

function getPostText(post) {
    var rawMarkup = marked.parse(post);
    return { __html: rawMarkup };
}

function FishPost(props) {

    const markupHTML = useMemo(() => getPostText(props.post||''),[props.post]);
    const FishPostChange = (e) => {
        let post = e.target.value;
        let init_post = post.slice(0, 2);
        if (init_post.localeCompare("# ") !== 0)  {
            if (post[0] == "#")
                post = post.slice(1);

            post = "# " + post;
        }

        props.setPost(post);
     }

    const hidePostsClass = hidePosts(props.loaded)

    return(
        <div className={hidePostsClass}>
            <div className="col-xl-6">
               <textarea 
                   className="form-control fish-input fish-post" 
                   rows="30" placeholder="Write your post here!" 
                   id="floatingTextarea" 
                   onChange={FishPostChange}
                   value = {props.post}
                   >
                </textarea>
            </div>
            <div className="col-md-6">
                <div className="post-box">
                    <div className="overflow-auto firstpost-box-inner" dangerouslySetInnerHTML={markupHTML} />
                </div>
            </div>
            <div className="col-xl-6">
                <button type="button" className="btn btn-primary mt-3" onClick={() => {props.handleClick()}}>Publish</button> 
            </div>
        </div>
    )

} 


export default FishPost