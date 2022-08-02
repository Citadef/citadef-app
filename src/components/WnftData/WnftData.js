import { ethers } from "ethers";
import { useEffect } from "react";
import wnftDataAbi from "../WNFTABI";
import { MINTING_CONTRACT_ABI } from "./abis/MintingContract"

import { fetchCID as ipfsFetchCID } from  '../ipfs.js';

import { getRpcUrl, getNetChainIdHex } from "../WnftContract/provider";

const CONTRACT_CHAIN = 'polygon'


const getIpfsData = async (ipfs, fishCID) => {
    const fishJSON = await ipfsFetchCID(ipfs, fishCID);
    const fishJSONData = JSON.parse(fishJSON);

    return fishJSONData
}


const handleNToken = async (i, NFTW_contract, ipfs) => {
    const fishSeed = await NFTW_contract.NthToken(i);
    //fishSeed = parseInt(fishSeed._hex, 16);
    const fishSeedInt = ethers.BigNumber.from(parseInt(fishSeed._hex, 16).toString());
    const fishCID = await NFTW_contract.tokenURI(fishSeedInt);

    // const fishJSON = await ipfsFetchCID(ipfs, fishCID);
    // const fishJSONData = JSON.parse(fishJSON);


    const results = await Promise.allSettled(
        [getIpfsData(ipfs, fishCID), 
            NFTW_contract.ownerOf(fishSeedInt)]
    );

    let fishJSONData;
    if(results[0].status==='fulfilled'){
        fishJSONData = results[0].value;
    }

    let owner;
    if(results[1].status==='fulfilled'){
        owner = results[1].value;
    }

    return {fishJSONData, fishSeed, owner};
    
  };

const addToOwners = (owners, owner, fishSeed) =>{
    if (owners[owner])
       owners[owner][fishSeed] = true;
     else {
       owners[owner] = {};
       owners[owner][fishSeed] = true;
     }
     return owners;
}


const getAllFishes = async (totalMinted, NFTW_contract, ipfs) => {
    let items  = [];
    for (let i=0;i<totalMinted;i++){
        items.push( handleNToken(i, NFTW_contract, ipfs) )
    }

    let fishesCollection = {};
    let owners = {};
    const results = await Promise.allSettled(
        items
    );
    let totalFetched = 0;

    results.forEach((result) => {
        if(result.status==='fulfilled'){
            const {fishJSONData, fishSeed, owner} = result.value;
            fishesCollection[fishSeed] = fishJSONData;
            owners = addToOwners(owners, owner, fishSeed);
            totalFetched++;
        }
    })

    return {fishesCollection, owners, totalFetched}
};

const fetchFishes = async (props) => {
    try {
        var chainId = false;

        try{
            if (window.ethereum)
                chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }catch{}

        console.log("chainId: ", chainId);

        const provider = (window.ethereum && chainId === getNetChainIdHex(CONTRACT_CHAIN) && new ethers.providers.Web3Provider(window.ethereum )) || new ethers.providers.JsonRpcProvider(getRpcUrl(CONTRACT_CHAIN));

        console.log("provider: ", provider);

        const signer = provider.getSigner(0);
        if (signer !== null) {

            const NFTWContractAddress = wnftDataAbi.address;
            let WNFTabi = wnftDataAbi.abi;
            let NFTW_contract = new ethers.Contract(NFTWContractAddress, WNFTabi, provider);

            console.log("NFTW_contract: ", NFTW_contract);
            const contractMinted = await NFTW_contract.amount();
            console.log("contractMinted: ", contractMinted);
            const contractMintedInt = parseInt(contractMinted._hex, 16)
            props.setMinted(contractMinted.toNumber());
            
            NFTW_contract.mintingContract().then(async (mintingContractAddress) => {
                const mintingContract = new ethers.Contract(mintingContractAddress, MINTING_CONTRACT_ABI, provider);
                const maxAmount = await mintingContract.maxAmount();
                props.setMaxAllowedMinting(maxAmount.toNumber());
            })

            
            getAllFishes(contractMintedInt, NFTW_contract, props.ipfs).then((result) => {
                const {owners, fishesCollection, totalFetched} = result;
                props.setFishowners(owners);
                props.setFishes(fishesCollection);
                props.setMinted(totalFetched);
            });

        }
    } catch (error) {
        console.error(error);
    }
}


const WnftData = (props) => {
    
    useEffect(() => {
        if(props.isIpfsReady){
            fetchFishes(props)
        }
    }, [props.isIpfsReady]);
    return (<></>)
}


export default WnftData;