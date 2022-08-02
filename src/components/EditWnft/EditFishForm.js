import { useState } from "react";
import { useParams } from "react-router-dom";
import Fish from "../fish"
import LoadingModal from "../helpers/LoadingModal";
import {setTokenURI} from "../WnftContract/WnftContract"
import FishName from "./FishName";
import FishDescription from "./FishDescription";


const EditFishForm = props => {
    const [showLoading, setShowLoading] = useState(false);

    let { seed } = useParams();
    const [fishCID, setFishCID] = useState("");

    const nick = props.nick;
    const desc = props.desc;

    function handleClick() {

        setShowLoading(true);

        // build WNFT details json
        let wnft_details = {};
        wnft_details.seed = seed.toString();
        wnft_details.nick = nick;
        wnft_details.desc = desc;

        wnft_details.posts = props.fish.posts
        props.ipfs.add(JSON.stringify(wnft_details)).then((cid) => {

            setFishCID(cid.path);
            const tokenUri = (!cid.path.startsWith('ipfs://') && 'ipfs://' + cid.path) || cid.path
            setTokenURI(props.NFTWWithSigner, wnft_details.seed, tokenUri).then(()=> {
                setShowLoading(false);
            }).catch(() => setShowLoading(false));

        });

    }

    return (<>
                <LoadingModal show={showLoading} />
                <div className="row">
                    <div className="col-md-6">
                        <h3> #{seed} - cid {fishCID} </h3>

                        <FishName setNick={props.setNick} nick={nick} />
                        <FishDescription setDesc={props.setDesc} desc={desc} />
                    </div>

                    <div className="col-md-6">
                        <div>
                            <Fish seed={seed} size="400" direction="left"/>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary btn-select-mint mt-3" onClick={handleClick}>Save</button> 
                    </div>
                </div>
            </>)
}


export default EditFishForm;
