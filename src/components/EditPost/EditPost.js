
import { useParams } from "react-router-dom";
import { LoadPage } from "../loadingProcess";
import {loadFish} from "../helpers/FishUtils"
import EditPostPage from "./EditPostPage"


function EditPost(props) {
    const {seed, post} = useParams();

    const fish = loadFish(props.fishes, seed)

    return (
        <LoadPage fishes={props.fishes} seed={seed} post={post} access={true} walletAddress={props.walletAddress} fishOwners = {props.fishOwners} 
          page={<EditPostPage seed={seed} post={post} fish={fish} NFTWWithSigner={props.NFTWWithSigner} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady}/>} />
    )
    

}

export default EditPost;