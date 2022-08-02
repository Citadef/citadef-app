import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Helmet } from 'react-helmet'

import {loadFish} from "../helpers/FishUtils";

import EditFishForm from "./EditFishForm";


const EditWnft = props => {
    const NFTWWithSigner = props.NFTWWithSigner;
    const fishes = props.fishes;

    const { seed } = useParams();

    const fishMain = loadFish(fishes, seed)

    const [fish, setFish] = useState("");
    const [nick, setNick] = useState(fishMain.nick);
    const [desc, setDesc] = useState(fishMain.desc);

    useEffect(()=> {
        setNick(fishMain.nick);
        setDesc(fishMain.desc);
    },[fishMain])

    
    
    return ( 
            <section id="section-collections" className="pt30 pb30">
                <Helmet>
                  <title>Citadef - Edit your fish! Time for a change!</title>
                </Helmet>
                <div className="container">
                    <div className="col-lg-12 top-100">
                        <h1 className="style-2">Edit your fish</h1>
                    </div>

                   <EditFishForm NFTWWithSigner={NFTWWithSigner} fish={fishMain} setNick={setNick} setDesc={setDesc} 
                   nick={nick} desc={desc} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady} />

                </div>
            </section>
    )
}

export default EditWnft;