// To add a new post to profile

const newPost = async () => {
    const post_title = document.querySelector('#post-title');
    const post_description = document.querySelector('#post-body');

    const newPostData = await fetch('api/profile/', {
        method: 'POST',
        body: JSON.stringify({ post_title, post_description }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (newPostData.ok) {
        document.location.replace('/profile')
    } else {
        alert('Failed to post!')
    }
};

const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', newPost);