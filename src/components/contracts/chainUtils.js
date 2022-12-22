//** Constants **//

// a list of the chain id of each chains
const CHAIN_IDS = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
    polygon: 137,
    mumbai: 80001
}

// a list of the chain name of each chain id (inverse of CHAIN_IDS)
const CHAIN_NAMES = 
    Object.fromEntries(Object.entries(CHAIN_IDS).map(a => a.reverse()))

const CHAINS_RPC_URLS = {'polygon': 'https://polygon-rpc.com/'}

const INFURA_ID = process.env.REACT_APP_INFURA_ID


//** Functions **//
const getInfuraJsonRpcUrl = 
    (net) => 'https://' + net.toLowerCase() + '.infura.io/v3/' + INFURA_ID

const getInfuraWebSocketRpcUrl = 
    (net) => 'wss://' + net.toLowerCase() + '.infura.io/ws/v3/' + INFURA_ID


const getChainId = 
    (net) => CHAIN_IDS[net.toLowerCase()]

const getRpcUrl = 
    (net) => (CHAIN_IDS[net.toLowerCase()]!==undefined 
                            && CHAINS_RPC_URLS[net.toLowerCase()]===undefined 
                            && getInfuraJsonRpcUrl(net)
                            ) || 
                            CHAINS_RPC_URLS[net.toLowerCase()]

const getChainIdToDisplay = 
    (chainId) => 
        { return (CHAIN_NAMES[chainId] && capitalizeWords( CHAIN_NAMES[chainId]));}

const getNetChainIdHex = 
    (net) => CHAIN_IDS[net.toLowerCase()] !== undefined 
             && ("0x" + (CHAIN_IDS[net.toLowerCase()].toString(16)))

export {getRpcUrl, getChainId, getChainIdToDisplay, getNetChainIdHex};

/** Utility Functions */
const capitalizeWords = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    return arr.join(" ");
}
