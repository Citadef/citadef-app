import { useHistory } from "react-router-dom";

import FishCards from "./FishCards/FishCards";
import {shuffleArray} from "./helpers/FishUtils"


const HOME_PAGE_MAX_FISH_SHOW = 5

function Citadef(props) {
    const history = useHistory();

    const routeExplore = () =>{ 
        history.push("/explore");
      }

    const homePageFishes = Object.fromEntries(shuffleArray(Object.entries(props.fishes)).slice(0,5))

    return ( 
         <section id="section-collections" className="pt30 pb30">
                <div className="container relative-position">
                    <div className="col-lg-12 top-100">
                        <h2 className="style-2">The Citadef Council: {props.minted} members. Let's explore them!</h2>
                    </div>
                    <div className="bg-main-middle-left d-none d-lg-block"></div>
                    <div className="bg-main-middle-right d-none d-lg-block"></div>
                    <FishCards fishes={homePageFishes}  />

                    <div className="text-center"> 
                        <button type="button" className="btn btn-primary btn-select-showmore" onClick={routeExplore}>
                            Swim with the fishes
                        </button>
                    </div>
                </div>
            </section>
    )
}

export default Citadef;