import { useMemo } from "react";
import { marked } from "marked"; 

import "components/mintAndEditFish/formComponents/formComponents.css";

const getPostText = post => {
    var rawMarkup = marked.parse(post);
    return { __html: rawMarkup };
}

const FishFirstPost = props => {

    const FishPostChange = (e) => {
        let post = e.target.value;

        // verify that the post begins with a '#', because first line must be a title
        let init_post = post.slice(0, 2);
        if (init_post.localeCompare("# ") !== 0)  {
            if (post[0] == "#")
                post = post.slice(1);

            post = "# " + post;
        }

        props.setPost(post);
     }

    // transfer the post text into HTML using markdown
    const markupHTML = useMemo(() => getPostText(props.post),[props.post]);


    return (<div className="row firstpost-border">

                <div className="col-md-6">
                    <div>
                        <textarea rows="10" className="fish-input form-control fish-post" 
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


export default FishFirstPost;