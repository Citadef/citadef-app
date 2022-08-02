import {EMPTYFISH} from "../loadingProcess"

export const loadFish = (fishes, seed) => {
    let newFish;

    if (fishes[seed]!==undefined)  
        newFish = fishes[seed];
    else {
        newFish =  EMPTYFISH;
    }

    return newFish;
}


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

//  10 December 2021
export const publishTimeDisplay = timestamp =>{

    let d = new Date(timestamp);
    let day = d.getDate();
    day = (day < 10 ? "0" : "") + day;

    const month = monthNames[d.getMonth()];

    const year = d.getFullYear();



    return day + " " + month + ((new Date().getFullYear()==year)?"":" " + year);

}

export const fishPageUrl = (seed) => {
    return '/personal/' + seed
}

export const postPageUrl = (seed, postId) => {
    return "/personal/post/edit/" + seed + "/" + postId
}

export const shuffleArray = (sourceArray) => {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
