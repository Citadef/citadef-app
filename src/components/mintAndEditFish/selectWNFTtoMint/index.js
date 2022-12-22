import { useState } from "react";
import { Helmet } from 'react-helmet'

import CardSelecttoMint from "components/mintAndEditFish/cardSelecttoMint";
import {sfc32} from  "components/helpers/crypto"

  
function SelectWNFTtoMint(props) {
    const { node: [node, setNode]} = {
        node: useState(null),
        ...(props.state || {})
    };

    const [count, setCount] = useState("1");

    // const maxMintingReached = props.minted >= props.maxAllowedMinting
    const maxMintingReached = false;

    // returns a JSX component with props.num random fish cards for possible minting
    function RandomFishesToMint(props) {
        let fishes = [];

        for (let i = 0; i<props.num; i++)
            fishes.push(<CardSelecttoMint seed={rand()* 100000000000000000}/>);

        return (
            <>
                {fishes}
            </>
        )
    }

    // refresh the list of possible fishes for minting in the screen
    function showOtherFishes(e) {
        e.currentTarget.blur();
        setCount(count+1);
        setSeed(seed+1);
        document.getElementById("header").scrollIntoView({behavior:"smooth"});
    }

    const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000000000));
    const rand = sfc32(seed.toString(), seed.toString(), seed.toString(), seed.toString());
   
    return ( 
        <section>
            <Helmet>
                <title>Citadef - Select a fish for your account</title>
            </Helmet>
            <div className="container">
                {!maxMintingReached && (
        <>
            <div className="col-lg-12 top-100">
                <h1>Select your fishy</h1>
            </div>
            <div className="row justify-content-center">
                <RandomFishesToMint num="9"/>

            </div>

            <div className="text-center"> 
                <button type="button" className="btn btn-primary btn-citadef" onClick={(e)=> showOtherFishes(e)}>
                    These fishes are ugly! Show me others!
                </button>
            </div>
        </>)}
            {maxMintingReached && (<div className="col-lg-12 pt-5">
                <h1>Sorry no more fishes in the lake</h1>
            </div>)}
                            
            </div>
        </section>
    )
}

export default SelectWNFTtoMint;