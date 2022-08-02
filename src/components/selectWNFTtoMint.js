import { useState } from "react";
import { Helmet } from 'react-helmet'

import CardSelecttoMint from "./cardSelecttoMint";
  
function SelectWNFTtoMint(props) {
    const { node: [node, setNode]} = {
        node: useState(null),
        ...(props.state || {})
    };

    const [count, setCount] = useState("1");

    const maxMintingReached = props.minted >= props.maxAllowedMinting

    function showOtherFishes(e) {
        e.currentTarget.blur();
        setCount(count+1);
        setSeed(seed+1);
        document.getElementById("header").scrollIntoView({behavior:"smooth"});
    }

    /** PRNG **/
    function sfc32(a, b, c, d) {
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
    const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000000000));
    const rand = sfc32(seed.toString(), seed.toString(), seed.toString(), seed.toString());
   
    return ( 
<section id="section-mint" className="pt30 pb30">
    <Helmet>
        <title>Citadef - Select a fish for your account</title>
    </Helmet>
    <div className="container">
        {!maxMintingReached && (
<>
    <div className="col-lg-12 top-100">
        <h1 className="style-2">Select your fishy</h1>
    </div>
    <div className="row justify-content-center">
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>
        <CardSelecttoMint seed={rand()* 100000000000000000}/>

    </div>

    <div className="text-center"> 
        <button type="button" className="btn btn-primary btn-select-showmore" onClick={(e)=> showOtherFishes(e)}>
            These fishes are ugly! Show me others!
        </button>
    </div>
</>)}
    {maxMintingReached && (<div className="col-lg-12 top-100">
        <h1 className="style-2">Sorry no more fishes in the lake</h1>
    </div>)}
                    
    </div>
</section>
    )
}

export default SelectWNFTtoMint;