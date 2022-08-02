import { Link } from "react-router-dom";
import {ownThisFish} from "../loadingProcess";


function EditButton(props) {
    if (ownThisFish(props.seed, props.walletAddress, props.fishOwners)) {

        return (
            <Link to={"/personal/post/edit/" + props.seed + "/" + props.post}>
                <img src="./images/blog/edit.svg" className="w-20" />
            </Link>
        )
    } else {
        return (<></>)
    }
}

export default EditButton;