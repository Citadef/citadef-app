import { useState } from "react";
import CardSelecttoMint from "../cardSelecttoMint"
import MintFishForm from "./MintFishForm";
import { Helmet } from 'react-helmet'



/** PRNG **/
const sfc32 = (a, b, c, d) => {
    return function() {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
        var t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}


const MintWNFTScreen = (props) => {
    const NFTWWithSigner = props.NFTWWithSigner;
    const provider = props.provider;
    
    const [seedForGeneration, setSeedForGeneration] = useState(Math.floor(Math.random() * 1000000000000));
    const rand = sfc32(seedForGeneration.toString(), seedForGeneration.toString(), seedForGeneration.toString(), seedForGeneration.toString());
    const [moreFishSeeds, setMoreFishSeeds] = useState([rand()* 100000000000000000, rand()* 100000000000000000, rand()* 100000000000000000])
        
       
    return ( 
<section id="section-collections" className="pt30 pb30">
    <Helmet>
        <title>Citadef - Mint your fish! Join the Citadel!</title>
    </Helmet>
    <div className="container">
        <div className="col-lg-12 top-100">
            <h1 className="style-2">Mint a fish</h1>
        </div>

        {NFTWWithSigner && (
<>
    <MintFishForm NFTWWithSigner={NFTWWithSigner} provider={provider} walletAddress={props.walletAddress} ipfs={props.ipfs} />
    <div className="col-lg-12 pt-5">
        <h1 className="style-2">Mint other fishes</h1>
        <div className="row">
            <CardSelecttoMint key={0} seed={moreFishSeeds[0]}/>
            <CardSelecttoMint key={1} seed={moreFishSeeds[1]}/>
            <CardSelecttoMint key={2} seed={moreFishSeeds[2]}/>
        </div>
    </div>
</>)}
        {!NFTWWithSigner && 
        (<div className="col-lg-12 pt-5">
            <h1 className="style-2">You must connect to your Polygon wallet to mint a fish</h1>
        </div>)}
    </div>
</section>
    )
}

export default MintWNFTScreen;