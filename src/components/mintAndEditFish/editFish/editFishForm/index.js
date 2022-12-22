import { useState } from "react";
import { useParams } from "react-router-dom";

import Fish from "components/fish"
import LoadingModal from "components/helpers/LoadingModal";
import {setTokenURI} from "components/contracts/wnftContract"

import FishName from "components/mintAndEditFish/formComponents/fishName";
import FishDescription from "components/mintAndEditFish/formComponents/fishDescription";


const EditFishForm = props => {
    let { seed } = useParams();

    const [showLoading, setShowLoading] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [fishCID, setFishCID] = useState("");

    const name = props.name;
    const desc = props.desc;

    function handleClick() {
        // check input
        let to_return = false;
        if (name == "") {
            setNameError(true);
            to_return = true;
        } else
            setNameError(false);

        if (desc == "") {
            setDescError(true);
            to_return = true;
        } else
            setDescError(false);

        if (to_return)
            return;

        setShowLoading(true);

        // build WNFT details json
        let wnft_details = {};
        wnft_details.seed = seed.toString();
        wnft_details.name = name;
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

                        <FishName setName={props.setName} name={name} nameError={nameError} />
                        <FishDescription setDesc={props.setDesc} desc={desc} descError={descError}/>
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
