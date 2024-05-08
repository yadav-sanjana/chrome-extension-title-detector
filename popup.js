document.addEventListener('DOMContentLoaded', () => {
    const extractProfilesBtn = document.getElementById('extractProfilesBtn');
    extractProfilesBtn.addEventListener('click', async () => {
        const profileLinksInput = document.getElementById('profileLinks').value;
        const profileLinks = profileLinksInput.split(',').map(link => link.trim());
        
        if (profileLinks.length < 3) {
            alert('Please provide at least 3 LinkedIn profile links.');
            return;
        }

        await scrapeProfiles(profileLinks);
    });
});

async function scrapeProfiles(profileLinks) {
    try {
        for (let i = 0; i < profileLinks.length; i++) {
            const link = profileLinks[i];

            // Open LinkedIn profile link in a new tab
            const tab = await openTab(link);

            // Wait for the page to load
            await waitForPageLoad(tab.id);

            // Extract profile data from the current tab
            const profileData = await extractProfileData(tab.id);

            // Post profile data to API and close tab
            await Promise.all([sendProfileDataToAPI(profileData), closeTab(tab.id)]);

            // If there are more URLs, log and proceed to the next one
            if (i < profileLinks.length - 1) {
                console.log('Moving to next profile...');
            } else {
                console.log('Scraping completed for all profiles.');
            }
        }
    } catch (error) {
        console.error('Error scraping profiles:', error);
    }
}



async function openTab(link) {
    return new Promise(resolve => {
        chrome.tabs.create({ url: link }, tab => {
            resolve(tab);
        });
    });
}

async function waitForPageLoad(tabId) {
    return new Promise(resolve => {
        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
            if (updatedTabId === tabId && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        });
    });
}

async function extractProfileData(tabId) {
    return new Promise(resolve => {
        chrome.tabs.executeScript(tabId, { file: 'contentScript.js' }, async function () {
            const profileData = await new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, { type: 'extractProfileData' }, function (response) {
                    if (chrome.runtime.lastError) {
                        reject(new Error(chrome.runtime.lastError.message));
                    } else {
                        resolve(response);
                    }
                });
            });
            resolve(profileData);
        });
    });
}

async function closeTab(tabId) {
    return new Promise(resolve => {
        chrome.tabs.remove(tabId, () => {
            resolve();
        });
    });
}

async function sendProfileDataToAPI(profileData) {
    console.log(profileData);
    const response = await fetch('http://127.0.0.1:3000/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    });
    if (!response.ok) {
        throw new Error('Failed to send profile data to API');
    }
}
