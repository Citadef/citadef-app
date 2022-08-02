import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Fish from "../fish"
import LoadingModal from "../helpers/LoadingModal";
import FishPost from "./FishPost";
import FishName from "./FishName";
import FishDescription from "./FishDescription";

import { mintWithTokenURI} from "../WnftContract/WnftContract"

import {fishPageUrl} from "../helpers/FishUtils"

const MintFishForm = props => {

    const [showLoading, setShowLoading] = useState(false);
    const [nick, setNick] = useState("");
    const [desc, setDesc] = useState("");
    const [post, setPost] = useState("");
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [fishCID, setFishCID] = useState("");

    const {seed} = useParams();

    let history = useHistory();

    function handleClick() {
        // build WNFT details json
        let wnft_details = {};
        wnft_details.seed = seed.toString();
        wnft_details.nick = nick;
        wnft_details.desc = desc;

        let to_return = false;
        if (wnft_details.seed == "") {
            alert("Something is wrong, seed can't be empty.");
            to_return = true;
        } 

        if (wnft_details.nick == "") {
            setNameError(true);
            to_return = true;
        } else
            setNameError(false);

        if (wnft_details.desc == "") {
            setDescError(true);
            to_return = true;
        } else
            setDescError(false);

        if (to_return)
            return;

        setShowLoading(true);

        // prepare post
        if (post !== "") {
            let first_post = {};
            first_post.text = post;
            first_post.publishTime = Date.now();
            first_post.editTime = 0;
            wnft_details.posts = {};
            wnft_details.posts[first_post.publishTime] = first_post;
        }
        
        
        // check network
        props.provider.getNetwork().then((network) => {
            console.log("network: ", network);
            if (network.name == "matic") {
                props.ipfs.add(JSON.stringify(wnft_details)).then((cid) => {
                    setFishCID(cid.path);
                    mintWithTokenURI(props.NFTWWithSigner, props.walletAddress, seed, cid.path).then(()=>{
                        setTimeout(function() {
                            history.push(fishPageUrl(seed))
                            setShowLoading(false);
                            window.location.reload();
                        }, 40000);
                    })
                });
            } else {
                setShowLoading(false);
                alert("Please switch to Polygon network to mint an account.");
            }
        })

    }

    return (<>
                <LoadingModal show={showLoading} />
                <div className="row">
                    <div className="col-md-6 d-lg-none">
                        <div>
                            <Fish seed={seed} size="300" direction="left"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3> #{seed} - cid {fishCID} </h3>
                        <h5> An account costs 1$ in MATIC, and is minted on Polygon </h5>

                        <FishName setNick={setNick} nick={nick} nameError={nameError} />
                        <FishDescription setDesc={setDesc} desc={desc} descError={descError} />
                    </div>

                    <div className="col-md-6 d-none d-lg-block">
                        <div>
                            <Fish seed={seed} size="400" direction="left"/>
                        </div>
                    </div>

                </div>
                <div className="row g-3 ">
                    <div>
                        <label className="col-form-label">Fish first post!</label>
                    </div>
                </div>

                <FishPost setPost={setPost}  post={post} />
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary btn-select-mint mt-3" onClick={handleClick}>Mint an account</button> 
                    </div>
                </div>
            </>)
}

export default MintFishForm;