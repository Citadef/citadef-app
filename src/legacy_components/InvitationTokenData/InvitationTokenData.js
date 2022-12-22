import { ethers } from "ethers";
import { useEffect } from "react";
import "components/contracts/ABIs/InviteTokenABI.js"


import { getRpcUrl, getNetChainIdHex } from "components/contracts/chainUtils";

const invitationTokensAmount = async (address) => {
    try {
        var chainId = false;

        try{
            if (window.ethereum)
                chainId = await window.ethereum.request({ method: 'eth_chainId' });
        }catch{}

        const provider = (window.ethereum && chainId === getNetChainIdHex(process.env.REACT_APP_CHAIN) && new ethers.providers.Web3Provider(window.ethereum )) || new ethers.providers.JsonRpcProvider(getRpcUrl(process.env.REACT_APP_CHAIN));

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