import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import wnftDataAbi from "components/contracts/ABIs/WNFTABI.js";
import ConnectWalletButton from "components/header/connectWalletButton"
import { getNetChainIdHex } from "components/contracts/chainUtils.js";

import './navBarCitadef.css'

import Logo from './citadef-logo.png'
import LogoSmall from './citadef-logo-small.png'


function NavBarCitadef(props) {
    const [contractLoaded, setContractLoaded] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);

    // on start check if wallet is already connected, if yes set provider and contract
    useEffect(async () => {
        const { ethereum } = window;
        let chainId = false;

        try{
            if (ethereum)
                chainId = await ethereum.request({ method: 'eth_chainId' });
        }catch{}

        if (ethereum && chainId === getNetChainIdHex(process.env.REACT_APP_CHAIN) && (props.provider == null)) {
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

        if (ethereum && chainId === getNetChainIdHex(process.env.REACT_APP_CHAIN)) {
            const web3_provider = new ethers.providers.Web3Provider(ethereum);
            props.setProvider(web3_provider);

            web3_provider.send("eth_requestAccounts", []).then(() => {
                setWalletConnected(true);
            });

        } else {
            if (ethereum && chainId !== getNetChainIdHex(process.env.REACT_APP_CHAIN)){
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
            <Navbar.Brand href="#" className="d-none d-lg-block"><img alt="Citadef logo" className="logo" src={Logo} /></Navbar.Brand>
            <Navbar.Brand href="#" className="d-lg-none"><img alt="Citadef logo" className="logo" src={LogoSmall} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#/explore">Explore</Nav.Link>
                    <Nav.Link href="#/mint/select">Mint an account</Nav.Link>
                    <Nav.Link href="#/about">About</Nav.Link>        
                </Nav>
            </Navbar.Collapse>
            <ConnectWalletButton walletConnected={walletConnected} connectEthWallet={connectEthWallet} />
        </Container>
    </Navbar>
    ) 

}


export default NavBarCitadef;