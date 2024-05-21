function getPostIds(count) {
  const posts = document.querySelectorAll('div[data-urn]');
  return Array.from(posts).slice(0, count).map(post => post.getAttribute('data-urn'));
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
  try {
    const postElement = document.querySelector(`div[data-urn="${postUrn}"]`);
    if (postElement) {
      const commentButton = postElement.querySelector('button[aria-label*="Comment"]');
      if (commentButton) {
        commentButton.click();

        const interval = setInterval(() => {
          const commentBox = postElement.querySelector('div.ql-editor');
          if (commentBox) {
            commentBox.innerHTML = commentText;
            const event = new Event('input', { bubbles: true });
            commentBox.dispatchEvent(event);

            const submitButton = postElement.querySelector('button.comments-comment-box__submit-button');
            if (submitButton) {
              submitButton.click();
              clearInterval(interval);
              console.log(`Commented on post: ${postUrn}`);
            }
          }
        }, 500);

        setTimeout(() => clearInterval(interval), 10000);
      } else {
        console.log(`Comment button not found for post: ${postUrn}`);
      }
    } else {
      console.log(`Post element not found for URN: ${postUrn}`);
    }
  } catch (error) {
    console.error(`Error commenting on post ${postUrn}:`, error);
  }
}

function interactWithPosts(likeCount, commentCount) {
  const postUrns = getPostIds(likeCount + commentCount);
  const commentText = "CFBR";

  postUrns.slice(0, likeCount).forEach(postUrn => {
    likePost(postUrn);
  });

  postUrns.slice(likeCount, likeCount + commentCount).forEach(postUrn => {
    commentPost(postUrn, commentText);
  });

  chrome.runtime.sendMessage({ action: 'taskCompleted' });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'interactWithPosts') {
    interactWithPosts(message.likeCount, message.commentCount);
    sendResponse({ status: 'started', postCount: message.likeCount + message.commentCount });
  }
});
