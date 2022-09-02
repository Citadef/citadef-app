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



    return day + " " + month + " " + year;

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

/**
 * Get the lastest posts across all blogs
 * @param  {object} fishes   an object of all blogs
 * @return {array[][]}          A double sorted array where the first column is fish id and the second is the id of its latest posts. The sorting is done by a decending order of latest post.
 */
export const latestPosts = (fishes) => {

    // it's hard to sort data in object of objects, so we turn fishes into an array
    let fishes_array = Object.entries(fishes);

    var latest_posts_array = fishes_array.map(fish => {
                            if (fish[1])
                                return [fish[0], latestPost(fish[1].posts)]
                            else
                                return [fish[0], "0"]
                        });

    latest_posts_array.sort(InverseCompareArraysSecondCell);

    return latest_posts_array;

}

// a function that gets a posts object and returns the time of the latest post
export const latestPost = (posts) => {
    let post_times = Object.keys(posts || {})

    // return "0" if the blog doesn't have any posts 
    if (post_times.length == 0)
        return "0";

    let last_point_timestamp = post_times[post_times.length -1];
    let last_post = posts[post_times[post_times.length -1]].text;

    // check that post is long enough
    if (last_post.length > 100)
        return last_point_timestamp;
    else
        //return 0 if post is too short, we don't want to show "hello world" empty posts
        return "0";
}

// A sorting function for sorting arrays by their second cell.
// This function provides inverse sorting.
export const InverseCompareArraysSecondCell = (a, b) => {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
} 