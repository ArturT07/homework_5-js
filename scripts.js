class Card {
    constructor(postId, userId, title, body, userName, userEmail) {
        this.postId = postId;
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    createCardElement() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardHTML = `
            <h2>${this.title}</h2>
            <p>${this.body}</p>
            <p>Posted by: ${this.userName} (${this.userEmail})</p>
            <span class="delete-button" data-postid="${this.postId}">Delete</span>
        `;

        cardElement.innerHTML = cardHTML;

        return cardElement;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.posts-container');


    fetch('https://ajax.test-danit.com/api/json/users')
        .then(response => response.json())
        .then(users => {
            fetch('https://ajax.test-danit.com/api/json/posts')
                .then(response => response.json())
                .then(posts => {

                    posts.forEach(post => {
                        const user = users.find(u => u.id === post.userId);
                        if (user) {
                            const card = new Card(post.id, user.id, post.title, post.body, user.name, user.email);
                            const cardElement = card.createCardElement();
                            postsContainer.appendChild(cardElement);


                            const deleteButton = cardElement.querySelector('.delete-button');
                            deleteButton.addEventListener('click', () => {
                                const postId = deleteButton.getAttribute('data-postid');

                                fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
                                    method: 'DELETE'
                                })
                                    .then(response => {
                                        if (response.ok) {

                                            cardElement.remove();
                                        }
                                    });
                            });
                        }
                    });
                });
        });
});
