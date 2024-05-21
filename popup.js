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
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: interactWithPosts,
                args: [likeCount, commentCount]
            }, () => {
                window.close();
            });
        });
    });
});

function interactWithPosts(likeCount, commentCount) {
    const postUrns = getPostIds(likeCount + commentCount);
    const commentText = "CFBR";
  
    postUrns.slice(0, likeCount).forEach(postUrn => {
      try {
        likePost(postUrn);
      } catch (error) {
        console.error(`Error liking post ${postUrn}:`, error);
      }
    });
  
    postUrns.slice(0, commentCount).forEach(postUrn => {
      try {
        commentPost(postUrn, commentText);
      } catch (error) {
        console.error(`Error commenting on post ${postUrn}:`, error);
      }
    });
  
    console.log('Interaction completed');
  }
  
  function getPostIds(count) {
    const posts = document.querySelectorAll('div[data-urn]');
    const postIds = Array.from(posts).slice(0, count).map(post => post.getAttribute('data-urn'));
    return postIds;
  }
  
  function likePost(postUrn) {
    const postElement = document.querySelector(`div[data-urn="${postUrn}"]`);
    if (postElement) {
      const likeButton = postElement.querySelector('button[aria-label*="Like"][aria-pressed="false"]');
      if (likeButton) {
        likeButton.click();
        console.log(`Liked post: ${postUrn}`);
      } else {
        console.log(`Like button already pressed or not found for post: ${postUrn}`);
      }
    } else {
      console.log(`Post element not found for URN: ${postUrn}`);
    }
  }
  
  function commentPost(postUrn, commentText) {
    const postElement = document.querySelector(`div[data-urn="${postUrn}"]`);
    if (postElement) {
      const commentButton = postElement.querySelector('button[aria-label*="Comment"]');
      if (commentButton) {
        commentButton.click();
  
        const interval = setInterval(() => {
          const commentBox = postElement.querySelector('textarea');
          if (commentBox) {
            commentBox.value = commentText;
            const event = new Event('input', { bubbles: true });
            commentBox.dispatchEvent(event);
  
            const submitButton = postElement.querySelector('button[type="submit"]');
            if (submitButton) {
              submitButton.click();
              clearInterval(interval);
              console.log(`Commented on post: ${postUrn}`);
            }
          }
        }, 500);
      } else {
        console.log(`Comment button not found for post: ${postUrn}`);
      }
    } else {
      console.log(`Post element not found for URN: ${postUrn}`);
    }
  }
