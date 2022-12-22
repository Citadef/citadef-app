import { Helmet } from "react-helmet";

import NavBarCitadef from "components/header/navBarCitadef"


function Header(props) {
    <Helmet> 
        <title> Ghoti - A democratic web WNFT experiment </title>
        <meta content="Ghoti - A democratic web WNFT experiment" name="description" />
        <meta content="WNFT, dWeb, dWebsites, NFT, DAO" name="keywords" />
        <meta content="Esteroids" name="author" />
    </Helmet>
   

    return ( 
        <>
            <NavBarCitadef provider={props.provider} setProvider={props.setProvider}
                NFTWContract={props.NFTWContract} setNFTWContract={props.setNFTWContract}
                NFTWWithSigner={props.NFTWWithSigner} setNFTWWithSigner={props.setNFTWWithSigner}
                ownFish={props.ownFish}/>
        </>
    )
}

export default Header;