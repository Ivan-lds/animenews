document
  .getElementById("comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Pegando o valor do comentário
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value;

    // Criando o elemento de comentário
    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
        <p>${commentText}</p>
        <div class="comment-buttons">
            <button class="like-button">👍</button>
            <span class="like-count">0</span>
            <button class="dislike-button">👎</button>
            <span class="dislike-count">0</span>
        </div>
        <button class="reply-button">Responder</button>
        <div class="reply-form">
            <textarea placeholder="Escreva sua resposta..." required></textarea>
            <button type="submit">Enviar</button>
        </div>
        <div class="replies"></div>
    `;

    // Adicionando o comentário ao container
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.appendChild(commentElement);

    // Limpando o campo de entrada de comentário
    commentInput.value = "";

    // Lógica para likes e dislikes
    commentElement
      .querySelector(".like-button")
      .addEventListener("click", function () {
        const likeCount = commentElement.querySelector(".like-count");
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      });

    commentElement
      .querySelector(".dislike-button")
      .addEventListener("click", function () {
        const dislikeCount = commentElement.querySelector(".dislike-count");
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
      });

    // Lógica para respostas
    const replyButton = commentElement.querySelector(".reply-button");
    const replyForm = commentElement.querySelector(".reply-form");
    replyButton.addEventListener("click", function () {
      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    });

    replyForm
      .querySelector("button[type='submit']")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const replyText = replyForm.querySelector("textarea").value;

        if (replyText) {
          const replyElement = document.createElement("div");
          replyElement.className = "reply";
          replyElement.innerHTML = `<p>${replyText}</p>`;
          commentElement.querySelector(".replies").appendChild(replyElement);
          replyForm.querySelector("textarea").value = "";
          replyForm.style.display = "none";
        }
      });
  });
