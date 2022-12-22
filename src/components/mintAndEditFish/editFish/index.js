import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet'

import {loadFish} from "components/helpers/FishUtils";
import EditFishForm from "components/mintAndEditFish/editFish/editFishForm";


const EditFish = props => {
    const NFTWWithSigner = props.NFTWWithSigner;
    const fishes = props.fishes;

    const { seed } = useParams();

    const fishMain = loadFish(fishes, seed)

    const [fish, setFish] = useState("");
    const [name, setName] = useState(fishMain.nick);
    const [desc, setDesc] = useState(fishMain.desc);

    useEffect(()=> {
        setName(fishMain.nick);
        setDesc(fishMain.desc);
    },[fishMain])

    
    
    return ( 
            <section id="section-collections">
                <Helmet>
                  <title>Citadef - Edit your fish! Time for a change!</title>
                </Helmet>
                <div className="container">
                    <div className="col-lg-12 top-100">
                        <h1 className="style-2">Edit your fish</h1>
                    </div>

                   <EditFishForm NFTWWithSigner={NFTWWithSigner} fish={fishMain} setName={setName} setDesc={setDesc} 
                   name={name} desc={desc} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady} />

                </div>
            </section>
    )
}

export default EditFish;