document.addEventListener('DOMContentLoaded', function() {
    const blogForm = document.getElementById('blogForm');

    if (blogForm) {
        blogForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(blogForm);

            fetch('http://localhost:3000/submit-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    content: formData.get('content'),
                    author: formData.get('author'),
                }),
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                blogForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    fetch('http://localhost:3000/blogs')
        .then(response => response.json())
        .then(blogs => {
            const feedDiv = document.getElementById('feed');
            if (feedDiv) {
                blogs.forEach(blog => {
                    const blogPost = document.createElement('div');
                    blogPost.classList.add('blog-post');
                    blogPost.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p><p><strong>Author:</strong> ${blog.author}</p><p><small>${new Date(blog.createdAt).toLocaleString()}</small></p>`;
                    feedDiv.appendChild(blogPost);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
