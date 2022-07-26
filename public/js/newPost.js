// To add a new post to profile

const newPost = async () => {
    const post_title = document.querySelector('#post-title').value;
    const post_description = document.querySelector('#post-body').value;

    const newPostData = await fetch('/api/profile/', {
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

const postBtn = document.querySelector('#submit-btn');

postBtn.addEventListener('click', newPost);