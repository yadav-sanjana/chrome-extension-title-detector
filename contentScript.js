// contentScript.js

// Function to extract profile data from the LinkedIn profile page
function extractProfileData() {
    const profileData = {};

    // Extract profile name
    const nameElement = document.querySelector('#ember36');
    profileData.name = nameElement ? nameElement.textContent.trim() : '';

    // Extract profile location
    const locationElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.TINKbPiuuIGifCifCbyHlbnTdDFTIPxzZHGY > div.ph5 > div.mt2.relative > div.GOKxMvicEgHOIfOYojBoGowGVunNzmbnY.mt2 > span.text-body-small.inline.t-black--light.break-words")
    profileData.location = locationElement ? locationElement.textContent.trim() : '';

    profileData.url = window.location.href;

    // Extract about section
    const aboutElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(3) > div.display-flex.ph5.pv3 > div > div > div > span:nth-child(1)")
    profileData.about = aboutElement ? aboutElement.textContent.trim(50) : '';

    // Extract bio section
    const bioElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.TINKbPiuuIGifCifCbyHlbnTdDFTIPxzZHGY > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words")
    profileData.bio = bioElement ? bioElement.textContent.trim() : '';

    // Extract follower count
    const followerCountElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(4) > div.kEKPWSPyyWAsMQwrwUyKlwcezghtYIiZYvpyI > div > div > div > p")
    profileData.followerCount = followerCountElement ? followerCountElement.textContent.trim() : '';

    // Extract connection count
    const connectionCountElement = document.querySelector("#ember130 > span")
    profileData.connectionCount =  connectionCountElement ? connectionCountElement.textContent.trim() : '';

    // Extract bio line
    const bioLineElement = document.querySelector('.profile-header .pv-about-section .pv-about__bio .inline-show-more-text');
    profileData.bioLine = bioLineElement ? bioLineElement.textContent.trim() : '';

    console.log(profileData, "profiledata from contentScript.js");
    return profileData;
}

// Send extracted profile data back to the extension background script
chrome.runtime.sendMessage({ type: 'profileData', data: extractProfileData() });
