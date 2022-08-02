import { ethers } from "ethers";
import { useEffect } from "react";
import "./InviteTokenABI.js"


import { getRpcUrl, getNetChainIdHex } from "../WnftContract/provider";

const CONTRACT_CHAIN = 'polygon'

const invitationTokensAmount = async (address) => {
    try {
        var chainId = false;

        try{
            if (window.ethereum)
                chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }catch{}

        const provider = (window.ethereum && chainId === getNetChainIdHex(CONTRACT_CHAIN) && new ethers.providers.Web3Provider(window.ethereum )) || new ethers.providers.JsonRpcProvider(getRpcUrl(CONTRACT_CHAIN));

        const signer = provider.getSigner(0);
        if (signer !== null) {

            const InviteTokenContractAddress = global.inviteToken.address;
            let InviteTokenAbi = global.inviteToken.abi;
            let InviteTokenContract = new ethers.Contract(InviteTokenContractAddress, InviteTokenAbi, provider);

            const tokenAmount = await InviteTokenContract.balanceOf(address);
            const tokenAmountInt = parseInt(tokenAmount._hex, 16)
            
            return tokenAmountInt;

        }
    } catch (error) {
        console.error(error);
        return 0;
    }
}



export default invitationTokensAmount;