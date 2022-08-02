import CardMainpage from "../cardMainpage"
import {useWindowDimensions} from  "../helpers/sizeUtils"

function FishCards(props) {
    let fish_rows = [];
    let big_fish_size = "";
    let small_fish_size = "";

    let {width} = useWindowDimensions();
    if (width > 992) {
        big_fish_size = "600";
        small_fish_size = "265"
    }
    else {
        big_fish_size = "250";
        small_fish_size = "250"
    }

    const fishes = props.fishes;
    const fishes_keys = Object.keys(props.fishes);

    const FISH_IN_ROW = 5

    let direction = "right";
    for (let i=0; i<= Math.floor((fishes_keys.length-1)/FISH_IN_ROW); i++) {

        const big_fish = fishes[fishes_keys[i*FISH_IN_ROW]];
        let big_fish_element = 
                <div className="col-md-6">
                <CardMainpage nick={big_fish.nick} seed={big_fish.seed} posts={big_fish.posts} col="col-md-12" size={big_fish_size} key={big_fish.seed} direction={direction} />
                </div>;

        direction = (direction=="right") ? direction = "left" : direction = "right";
        let small_fishes = [];
        if (i < Math.floor((fishes_keys.length-1)/FISH_IN_ROW)) {
            for (let j=1; j<5; j++) {
                const small_fish = fishes[fishes_keys[FISH_IN_ROW*i+j]];
                small_fishes.push(<CardMainpage nick={small_fish.nick} seed={small_fish.seed} key={small_fish.seed} posts={small_fish.posts} col="col-md-6" size={small_fish_size} direction={direction}/>);
            }

        } else {
             for (let j=1; j<=(fishes_keys.length-1) % FISH_IN_ROW; j++) {
                 const small_fish = fishes[fishes_keys[FISH_IN_ROW*i+j]];
                 small_fishes.push(<CardMainpage nick={small_fish.nick} seed={small_fish.seed} key={small_fish.seed} posts={small_fish.posts} col="col-md-6" size={small_fish_size} direction={direction}/>);
             }
        }

        // odd rows (count of i begin from 0)
        const is_even_row = i% 2 == 0


        fish_rows[i] = (
            <div  key={"fish-row" + i.toString()} className="row">
                {is_even_row && big_fish_element}
                <div className="col-md-6">
                    <div className="row">
                        {small_fishes}
                    </div>
                </div>
                {!is_even_row && big_fish_element}
            </div>
        )
    }


    return (
        <div>
            {fish_rows}
            
        </div>
    )
}


export default FishCards;