document.addEventListener('DOMContentLoaded', () => {
    const extractProfilesBtn = document.getElementById('extractProfilesBtn');
    extractProfilesBtn.addEventListener('click', async () => {
        const profileLinksInput = document.getElementById('profileLinks').value;
        const profileLinks = profileLinksInput.split(',').map(link => link.trim());
        
        if (profileLinks.length < 3) {
            alert('Please provide at least 3 LinkedIn profile links.');
            return;
        }

        await extractProfiles(profileLinks);
    });
});

async function extractProfiles(profileLinks) {
    try {
        for (const link of profileLinks) {
            // Open LinkedIn profile link in a new tab
            const tab = await openTab(link);

            // Wait for the page to load
            await waitForPageLoad(tab.id);

            // Extract profile data from the current tab
            const profileData = await extractProfileData(tab.id);

            // Close the tab
            await closeTab(tab.id);

            // Post profile data to API
            await sendProfileDataToAPI(profileData);
        }
    } catch (error) {
        console.error('Error extracting profiles:', error);
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
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (changeInfo.status === 'complete') {
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
    console.log(profileData)
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
