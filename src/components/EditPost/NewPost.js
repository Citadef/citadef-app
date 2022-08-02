import { useParams } from "react-router-dom";
import { LoadPage } from "../loadingProcess";
import {loadFish} from "../helpers/FishUtils"
import EditPostPage from "./EditPostPage"


function NewPost(props) {
    const {seed} = useParams();

    const fish = loadFish(props.fishes, seed)

    return (
        <LoadPage fishes={props.fishes} seed={seed} post={false} access={true} walletAddress={props.walletAddress} fishOwners = {props.fishOwners} 
          page={<EditPostPage seed={seed} fish={fish} NFTWWithSigner={props.NFTWWithSigner} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady}/>} />
    )
}

export default NewPost;
