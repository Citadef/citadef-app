import { useParams } from "react-router-dom";
import { LoadPage } from "../loadingProcess";
import SinglePostPage from "./SinglePostPage";
import {loadFish} from "../helpers/FishUtils"





function SinglePost(props) {
    const {seed, post} = useParams();

    const fish = loadFish(props.fishes, seed)


    return (
        <LoadPage fishes={props.fishes} seed={seed} post={post} access={false} walletAddress={null} fishOwners = {null} 
          page={<SinglePostPage seed={seed} post={post} fish={fish} walletAddress={props.walletAddress} fishOwners = {props.fishOwners}/>} />
    ) 
}

export default SinglePost;