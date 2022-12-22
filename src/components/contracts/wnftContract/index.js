import { ethers } from "ethers";

const handleContractTXWait = async (contractCallPromise) => {
    const contractCallTx = await contractCallPromise
    await contractCallTx.wait()
}


export const setTokenURI = async (contract, tokenId, tokenUri) => {
    try{
        await handleContractTXWait(contract.setTokenURI(tokenId, tokenUri))
    }catch(e) {
        throw e.message;
    } 
}         


export const mintWithTokenURI = async (contract, mintTo, tokenId, tokenUri) =>{
    try{
        // get price from the Oracle
        let accountPriceinWei = await contract.getTokenPrice();

        await handleContractTXWait(contract.mintWithTokenURI(ethers.utils.getAddress(mintTo), tokenId, tokenUri, { value: accountPriceinWei.inWei, gasLimit: 1000000 } ))
    }catch(e) {
        throw e.message;
    } 
} 