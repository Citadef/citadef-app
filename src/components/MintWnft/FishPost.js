import { useMemo } from "react";
import { marked } from "marked"; 


const getPostText = post => {
    var rawMarkup = marked.parse(post);
    return { __html: rawMarkup };
}

const FishPost = props => {

    const markupHTML = useMemo(() => getPostText(props.post),[props.post]);
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

    return (<div className="row firstpost-border">
                <div className="col-md-6">
                    <div>
                        <textarea id="post-input" rows="10" className="form-control fish-input fish-post" 
                            placeholder="Write your first post! Say hello to the world" onChange={FishPostChange} value={props.post}/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="firstpost-box">
                        <div className="overflow-auto firstpost-box-inner" dangerouslySetInnerHTML={markupHTML} />
                    </div>
                </div>
            </div>)
}


export default FishPost;