let followersContainer;
let followingContainer;
let followersList;
let followingList;
let followersCount = { value: 0 };
let followingCount = { value: 0 };
let followersArray = [];
let followingArray = [];
let notFollowingBack;

async function startFollowersComparison() {
    await fillFollowersArray();
    await fillFollowingArray();
    notFollowingBack = findMissingValues(followersArray, followingArray);
    console.log("These are the accounts that don't follow you back:");
    console.log(notFollowingBack);
}

async function fillFollowersArray() {
    document.querySelector('a[href$="/followers/"]').click();
    await delay(2000);
    followersContainer = document.getElementsByClassName('xyi19xy x1ccrb07 xtf3nb5 x1pc53ja x1lliihq x1iyjqo2 xs83m0k xz65tgg x1rife3k x1n2onr6');
    console.log("Followers container created (1/8)");
    await delay(2000);
    followersList = followersContainer[0].children[0].children[0].children;
    console.log("Followers list created (2/8)");
    await delay(2000);
    await scrollFollowers()
    console.log("Finished scrolling through followers (3/8)");
    await delay(2000);
    addFollowersToArray();
    console.log(`Added ${followersCount.value} followers to followers array (4/8)`);
    await delay(2000);
    document.getElementsByClassName("_abl-")[0].click()
    await delay(2000);
}

async function fillFollowingArray() {
    document.querySelector('a[href$="/following/"]').click();
    await delay(2000);
    followingContainer = document.getElementsByClassName("xyi19xy x1ccrb07 xtf3nb5 x1pc53ja x1lliihq x1iyjqo2 xs83m0k xz65tgg x1rife3k x1n2onr6");
    console.log("Following container created (5/8)");
    await delay(2000);
    followingList = followingContainer[0].children[0].children[0].children;
    console.log("Following list created (6/8)");
    await delay(2000);
    await scrollFollowing();
    console.log("Finished scrolling through following (7/8)");
    await delay(2000);
    addfollowingToArray();
    console.log(`Added ${followingCount.value} following to following array (8/8)`);
    await delay(2000);
    document.getElementsByClassName("_abl-")[0].click()
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Wait for `ms` milliseconds
}

async function scrollFollowers() {
    console.log("Scrolling through followers, please wait...")
    let keepScrolling = true;

    while (keepScrolling) {
        if (followersContainer[0].children[0].children[0].children.length == followersCount.value){
            keepScrolling = false;
        } else {
            followersCount.value = followersContainer[0].children[0].children[0].children.length
            followersContainer[0].scrollBy(0, 2000)
            await delay(2000);
        }
    }
}

function addFollowersToArray() {
    for (let i = 0; i < followersCount.value; i++) {
        followersArray.push(followersList[i].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].textContent)
    }
    console.log("Followers added to the array")
}

async function scrollFollowing() {
    console.log("Scrolling through following, please wait...")
    let keepScrolling = true;

    while (keepScrolling) {
        if (followingContainer[0].children[0].children[0].children.length == followingCount.value){
            keepScrolling = false;
        } else {
            followingCount.value = followingContainer[0].children[0].children[0].children.length
            followingContainer[0].scrollBy(0, 2000)
            await delay(2000);
        }
    }
}

function addfollowingToArray() {
    for (let i = 0; i < followingCount.value; i++) {
        followingArray.push(followingList[i].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].textContent)
    }
}

function findMissingValues(array1, array2) {
    return array2.filter(item => !array1.includes(item));
}

startFollowersComparison();
