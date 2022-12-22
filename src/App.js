import { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "components/header";
import Footer from "components/footer";
import LandingScreen from "components/landingScreen"
import Citadef from "components/citadef"
import SelectWNFTtoMint from "components/mintAndEditFish/selectWNFTtoMint"
import MintFish from "components/mintAndEditFish/mintFish"
import EditFish from "components/mintAndEditFish/editFish"
import FishPersonal from "components/fishPersonal"
import SinglePost from "components/SinglePost/SinglePost"
import EditPost from "components/editPost"
import UnderConstruction from "components/errorPages/underConstruction"
import Error404 from "components/errorPages/error404"
import About from "components/about"
import LoadPage  from "components/loadingProcess/loadPage";


import WnftData from "components/contracts/wnftData";
import useIpfsFactory from "components/hooks/useIpfsFactory"
import ExploreFishes from "components/exploreFishes";
import ScrollToTop from "./scrollToTop";

import 'components/contracts/ABIs/WNFTABI.js'; 

import 'App.css'
import 'css/buttons.css'

function App() {
  const [provider, setProvider] = useState(null);
  const [NFTWContract, setNFTWContract] = useState(null);
  const [NFTWWithSigner, setNFTWWithSigner] = useState(null);
  const [fishes, setFishes] = useState([]);
  const [minted, setMinted] = useState(0);
  const [fishOwners, setFishowners] = useState({});
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ownFish, setOwnFish] = useState(false);
  const [hasInvitationToken, setHasInvitationToken] = useState(false);
  const [maxAllowedMinting, setMaxAllowedMinting] = useState();

  const initState = {wallet: false, ownFish: false, address: null};
  const [userState, setUserState] = useState(initState);
  const { ipfs, ipfsInitError, isIpfsReady } = useIpfsFactory({ commands: ['id'] });

  const InvitationTokensNeeded = 0;

  // setup userState
  var signer;
  if (provider) { 
    // set that wallet exists
    if (wallet == false) 
      setWallet(true)

    // check if ownFish and address need to be updated
    if (signer !== null) {
      if (!ownFish) {
          provider.listAccounts().then(async(res)=>{
            if (res.length > 0) {
              if (res !== walletAddress) 
                setWalletAddress(res[0]);

              if (fishOwners[res[0]]) 
                setOwnFish(true);
            }
          });
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const headerObj = (<Header provider={provider} setProvider={setProvider}
                        NFTWContract={NFTWContract} setNFTWContract={setNFTWContract}
                        NFTWWithSigner={NFTWWithSigner} setNFTWWithSigner={setNFTWWithSigner}
                        wallet={wallet} ownFish={ownFish} hasInvitationToken={hasInvitationToken}/>);



  return (
    <Router basename="/">
      <WnftData setMinted={setMinted} setFishes={setFishes} setFishowners={setFishowners}  ipfs={ipfs} isIpfsReady={isIpfsReady} maxAllowedMinting={maxAllowedMinting} setMaxAllowedMinting={setMaxAllowedMinting} />
      {headerObj}
      <Switch>
        // landing page
        <Route exact path="/">
          <ScrollToTop />
          <LandingScreen/>
          <Citadef fishes={fishes} minted={minted} />

          <div className="bg-main-top"></div>
        </Route>
        
        // explore fishes page
        <Route path="/explore">
          <ScrollToTop />
          <ExploreFishes fishes={fishes} minted={minted} />

          <div className="bg-main-top"></div>
        </Route>
        
        // select fish to mint page
        <Route path="/mint/select">
          <ScrollToTop />
          <SelectWNFTtoMint minted={minted} maxAllowedMinting={maxAllowedMinting} />

          <div className="bg-main-top"></div>
        </Route>
        
        // mint a fish page
        <Route path="/mint/details/:seed">
          <ScrollToTop />
          <MintFish NFTWWithSigner={NFTWWithSigner} provider={provider} walletAddress={walletAddress}  ipfs={ipfs} isIpfsReady={isIpfsReady} />

        </Route>
        
        // edit your fish page
        <Route path="/personal/edit/:seed">
          <ScrollToTop />
          <LoadPage 
            fishes={fishes} access={true} walletAddress={walletAddress} 
            fishOwners = {fishOwners} 
            page={<EditFish 
              NFTWWithSigner={NFTWWithSigner} fishes={fishes} walletAddress={walletAddress}
              ipfs={ipfs} isIpfsReady={isIpfsReady}
            />} 
          />

        </Route>
        
        // edit a post page
        <Route path="/personal/post/edit/:seed/:postId">
          <ScrollToTop />
          <LoadPage 
            fishes={fishes} access={true} walletAddress={walletAddress} 
            fishOwners = {fishOwners} 
            page={<EditPost 
              fishes={fishes} NFTWWithSigner={NFTWWithSigner} 
              ipfs={ipfs} isIpfsReady={isIpfsReady}
            />} 
          />

          <div className="bg-blog-top"></div>
        </Route>
        
        // show a post page
        <Route path="/personal/post/:seed/:post">
          <ScrollToTop />
          <LoadPage 
            fishes={fishes} access={false} walletAddress={null} fishOwners = {null} 
            page={<SinglePost  
              fishes={fishes} walletAddress={walletAddress} fishOwners = {fishOwners}
            />} 
          />

        </Route>
        
        // publish a new post page.
        // Newpost uses Editpost, as writing a new post is 
        // like editing an empty post.
        <Route path="/personal/new/:seed">
          <ScrollToTop />

          <LoadPage 
            fishes={fishes} access={true} walletAddress={walletAddress} 
            fishOwners = {fishOwners} 
            page={<EditPost 
              fishes={fishes} NFTWWithSigner={NFTWWithSigner}
              ipfs={ipfs} isIpfsReady={isIpfsReady}
            />} 
          />

          <div className="bg-blog-top"> </div>
        </Route>

        // personal blog of a fish page. The page parameter tells
        // Loadpage which page to load in case the fishe exists.
        <Route path="/personal/:seed">
          <ScrollToTop />
          <LoadPage 
            fishes={fishes} post={false} access={false} 
            page={<FishPersonal 
                      fishes={fishes} ownFish={ownFish} 
                      walletAddress={walletAddress} fishOwners={fishOwners}
                  />
            } 
        />

          <div className="bg-blog-top"> </div>
        </Route>

        // 404 error page
        <Route path="/404">
          <ScrollToTop />
          <Error404/>

          <div className="bg-blog-top"> </div>
        </Route>
        
        // about page
        <Route path="/about">
          <ScrollToTop />
          <About/>

          <div className="bg-main-top"></div>
        </Route>
        
        /********************************************* 
         * Screens which are still under construction
         **********************************************/
        <Route path="/govern">
          <ScrollToTop />
          <UnderConstruction 
            title="governing section"
            reason="Governing will come once the decentralized accounts and blogging is more stable. Recall, the idea is that one full member = one vote, but it should take a while to gain enough reputation to become a full member."/>

          <div className="bg-main-top"></div>
        </Route>
        <Route path="/world">
          <ScrollToTop />
          <UnderConstruction 
            title="Virtual Fish world"
            reason="A virtual fish world is just something that sounds cool in our head, but we actually have no idea what do we mean by this. Suggestions are welcomed!"/>

          <div className="bg-main-top"></div>
        </Route>
        <Route path="/plot">
          <ScrollToTop />
          <UnderConstruction 
            title="Plot in the Virtual Fish world"
            reason="A virtual fish world is just something that sounds cool in our head, and even cooler then this, it sounds nice to have a plot in this world. However, we really don't know what it means yet."/>

          <div className="bg-main-top"></div>
        </Route>
        <Route path="/democraticweb">
          <ScrollToTop />
          <UnderConstruction 
            title="Democratic Web"
            reason="Here should be a link to an article of our vision to what the democratic web should be like. Alas, we did not write it yet! So, be patient, and don't wait in the sun."/>

          <div className="bg-main-top"></div>
        </Route>
        <Route path="/mailinglist">
          <ScrollToTop />
          <UnderConstruction 
            title="Mailing List"
            reason="We don't have a mailing list yet. Not sure we will ever have. But we needed another link to put in the footer, and mailing list sounds 'professional', right?"/>
          
          <div className="bg-main-top"></div>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
