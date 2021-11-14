export async function createComment(e){
    e.preventDefault();

    const form = document.getElementById('new-comment');
    const dataForm = new FormData(form);

    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments/';

    const comment = dataForm.get('postText');
    const username = dataForm.get('username');

    const commentData = {
        comment,
        username
    }
    if (Object.values(commentData).some(field => field === '')) {
        throw new Error('All fields are required!')
    }

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (res.ok !== true){
            const error = await res.json();
            throw new Error(error.message)
        }

        const data = await res.json();
        // post.commentsArr.push(data)
        form.reset();

    }catch (err){
        alert(err.message);
    }
}