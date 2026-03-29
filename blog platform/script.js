let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title === "" || content === "") {
        alert("Please fill all fields");
        return;
    }

    const post = {
        id: Date.now(),
        title,
        content,
        comments: []
    };

    posts.unshift(post);
    savePosts();
    displayPosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

function addComment(postId) {
    const input = document.getElementById(`comment-${postId}`);
    const text = input.value;

    if (text === "") return;

    const post = posts.find(p => p.id === postId);
    post.comments.push(text);

    savePosts();
    displayPosts();
}

function displayPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>

            <div class="comments">
                <h4>Comments</h4>
                ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}

                <div class="comment-input">
                    <input type="text" id="comment-${post.id}" placeholder="Write a comment...">
                    <button onclick="addComment(${post.id})">Add</button>
                </div>
            </div>
        `;

        postsContainer.appendChild(postDiv);
    });
}

displayPosts();