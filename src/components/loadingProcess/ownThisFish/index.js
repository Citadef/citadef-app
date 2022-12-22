function ownThisFish(seed, walletAddress, fishOwner) {
    let res = false;

    if (walletAddress in fishOwner) 
        if (seed in fishOwner[walletAddress]) 
            if (fishOwner[walletAddress][seed])
                res = true;

    return res;
}

export default ownThisFish;