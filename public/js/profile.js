const newPostBtn = document.querySelector('#newPost');

const renderNewPost = () => {
    document.location.replace('/newpost');
}

newPostBtn.addEventListener('click', renderNewPost)