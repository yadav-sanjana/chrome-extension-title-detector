document.addEventListener('DOMContentLoaded', function() {
    const likeCountInput = document.getElementById('likeCount');
    const commentCountInput = document.getElementById('commentCount');
    const submitButton = document.getElementById('submit');

    function validateInputs() {
        const likeCount = likeCountInput.value;
        const commentCount = commentCountInput.value;
        submitButton.disabled = !(likeCount && commentCount);
    }

    likeCountInput.addEventListener('input', validateInputs);
    commentCountInput.addEventListener('input', validateInputs);

    submitButton.addEventListener('click', function() {
        const likeCount = parseInt(likeCountInput.value, 10);
        const commentCount = parseInt(commentCountInput.value, 10);

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];

            chrome.tabs.sendMessage(activeTab.id, {
                action: 'interactWithPosts',
                likeCount: likeCount,
                commentCount: commentCount
            }, (response) => {
                if (response && response.status === 'started') {
                    window.close();
                } else {
                    console.error('Failed to start interaction with posts');
                }
            });
        });
    });
});
