import { useState, useCallback, useEffect } from "react";
import {Helmet} from "react-helmet";
import { ethers } from "ethers";
import {Navbar, NavDropdown, Nav, Container} from 'react-bootstrap';
import wnftDataAbi from "./WNFTABI";
import { getNetChainIdHex } from "./WnftContract/provider";
import { Link } from "react-router-dom";


const CONTRACT_CHAIN = 'polygon'


function ConnectWalletButton(props){
    let button_text, classList = "";

    if (!props.walletConnected) {
        button_text = "Connect";
        classList = "btn-main cursor-pointer";
    }
    else {
        button_text = "Connected";
        classList = "btn-main";
    }
    
    return (<a className={classList} onClick={props.connectEthWallet}><i className="icon_wallet_alt"></i><span>{button_text}</span></a>)
}

function InvitationToken(props) {
    // if (props.hasInvitationToken)
    //     return (
    //           <div className="px-1"><img alt="invitation-token" className="logo" src="./images/landing/invitation-token.png" /></div>
    //     )
    // else {
        return (
            <></>
        )
    // }
}

function Navigationbar(props) {

    const [contractLoaded, setContractLoaded] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(async () => {
        const { ethereum } = window;
        let chainId = false;

        try{
            if (ethereum)
                chainId = await ethereum.request({ method: 'eth_chainId' });
        }catch{}

        if (ethereum && chainId === getNetChainIdHex(CONTRACT_CHAIN) && (props.provider == null)) {
            const web3_provider = new ethers.providers.Web3Provider(ethereum);
            props.setProvider(web3_provider);
        }

        if (props.provider !== null && !contractLoaded) {

                props.provider.listAccounts().then((res) => {
                    if (res.length > 0)  {
                        setWalletConnected(true);

                        if (!contractLoaded) {
                            setupContract();
                        }
                    }

                });
            }
    },
    [props.provider])
        

    const connectEthWallet = useCallback(async () => {
        // get the data from the api
        const { ethereum } = window;
        let chainId = false;
        try{
            if (ethereum)
                chainId = await ethereum.request({ method: 'eth_chainId' });
        }catch{}

        if (ethereum && chainId === getNetChainIdHex(CONTRACT_CHAIN)) {
            const web3_provider = new ethers.providers.Web3Provider(ethereum);
            props.setProvider(web3_provider);

            web3_provider.send("eth_requestAccounts", []).then(() => {
                setWalletConnected(true);
            });

        } else {
            if (ethereum && chainId !== getNetChainIdHex(CONTRACT_CHAIN)){
                alert('You must connect with Polygon network wallet')
            }
            //window.alert("No Ethereum wallet is detected.");
            return;
          }
    }, []);


    function setupContract() {
        let signer = props.provider.getSigner();

        // extract ABI
        let NFTWabi = wnftDataAbi.abi;

        // create NFTW contract
        let NFTWAddress = wnftDataAbi.address;
        let newNFTWContract = new ethers.Contract(NFTWAddress, NFTWabi, props.provider);
        props.setNFTWContract(newNFTWContract);

        if ((newNFTWContract !== null) && (props.NFTWWithSigner == null) )
            props.setNFTWWithSigner(newNFTWContract.connect(signer));

        setContractLoaded(true);

    }


    return (
    <Navbar className="transparent"  expand="lg" id="header">
  <Container>
    <Navbar.Brand href="#" className="d-none d-lg-block"><img alt="Citadef logo" className="logo" src="./images/citadef-logo.png" /></Navbar.Brand>
    <Navbar.Brand href="#" className="d-lg-none"><img alt="Citadef logo" className="logo" src="./images/citadef-logo-small.png" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#/explore">Explore</Nav.Link>
        <Nav.Link href="#/mint/select">Mint an account</Nav.Link>
        <Nav.Link href="#/about">About</Nav.Link>        
      </Nav>
    </Navbar.Collapse>
    <ConnectWalletButton walletConnected={walletConnected} connectEthWallet={connectEthWallet} />
    <InvitationToken hasInvitationToken={props.hasInvitationToken}/>
  </Container>
</Navbar>

    ) 

}

function Header(props) {
     <Helmet> 
      <title> Ghoti - A democratic web WNFT experiment </title>
      <meta content="Ghoti - A democratic web WNFT experiment" name="description" />
      <meta content="WNFT, dWeb, dWebsites, NFT, DAO" name="keywords" />
      <meta content="Esteroids" name="author" />
    </Helmet>
   

    return ( 
        <>
            <Navigationbar provider={props.provider} setProvider={props.setProvider}
            NFTWContract={props.NFTWContract} setNFTWContract={props.setNFTWContract}
            NFTWWithSigner={props.NFTWWithSigner} setNFTWWithSigner={props.setNFTWWithSigner}
            ownFish={props.ownFish} hasInvitationToken = {props.hasInvitationToken}/>
        </>
    )
}

export default Header;