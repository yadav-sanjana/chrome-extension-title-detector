// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'profileData') {
        // Received profile data from content script
        const profileData = message.data;
        
        // Post profile data to API
        sendProfileDataToAPI(profileData)
            .then(() => {
                console.log('Profile data sent to API:', profileData);
            })
            .catch(error => {
                console.error('Error sending profile data to API:', error);
            });
    }
});

// Function to send profile data to the API
async function sendProfileDataToAPI(profileData) {
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
