const changeTitleBtn = document.querySelector('.changeTitleBtn');

//function to fetch title
async function getTitle(tabId) {
    try {
        //content script 
        const injectionResults = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => document.title,
        });

        //assigning injection results as title
        const title = injectionResults[0]?.result;

        //condition to display
        if (title) {
            const titleDisplay = document.querySelector('.titleDisplay');
            titleDisplay.textContent = title;
        }

        return title;
    } catch (error) {
        console.error('Error fetching title:', error);
        throw error;
    }
}

//on click event
changeTitleBtn.addEventListener('click', async () => {
    try {
        // Query for active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // error handing in case no active tab
        if (!tab) {
            console.error('No active tab found.');
            return;
        }

        // fetch current tab title
        const title = await getTitle(tab.id);

       //console log title
        console.log('Title:', title);
    } catch (error) {
        console.error('Error:', error);
    }
});
