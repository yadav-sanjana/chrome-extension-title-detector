// Function to extract profile data from the LinkedIn profile page
function extractProfileData() {
    const profileData = {};

    // Extract profile name
    const nameElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card > div.ph5 > div.mt2.relative > div:nth-child(1) > div > span.artdeco-hoverable-trigger.artdeco-hoverable-trigger--content-placed-bottom.artdeco-hoverable-trigger--is-hoverable.ember-view")
    profileData.name = nameElement ? nameElement.textContent.trim() : '';

    // Extract profile location
    const locationElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card.CdCkuXmaFKvUiWIoHGHbgiEqIKqxME > div.ph5.pb5 > div.mt2.relative > div.mt2 > span.text-body-small.inline.t-black--light.break-words")
    profileData.location = locationElement ? locationElement.textContent.trim() : '';

    // Extract profile URL
    profileData.url = window.location.href;

    // Extract about section
    const aboutElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section:nth-child(3) > div.display-flex.ph5.pv3 >div >div > div >span.visually-hidden")
    profileData.about = aboutElement ? aboutElement.textContent.trim() : '';

    // Extract bio section
    const bioElement = document.querySelector("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile.pvs-loader-wrapper__shimmer--animate > div > div > main > section.artdeco-card > div.ph5 > div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words")
    profileData.bio = bioElement ? bioElement.textContent.trim() : '';

    // Extract follower count as an integer
    const followerCountElement = document.querySelector("span[aria-hidden='true']");
    profileData.followerCount = followerCountElement ? followerCountElement.textContent.trim() : '';

    // Extract connection count as an integer
    const connectionCountElement = document.querySelector("span[aria-hidden='true']");
    profileData.connectionCount = connectionCountElement ? connectionCountElement.textContent.trim() : '';

    return profileData;
}

// Send extracted profile data back to the extension background script
chrome.runtime.sendMessage({ type: 'profileData', data: extractProfileData() });

