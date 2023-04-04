import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, toggleUserLike, user } from "../index.js";

export function renderPostsPageComponent({ appEl, singleUserView }) {
  const tasksHtml = posts
    .map((post) => {
      return `
          <li class="post">
          ${
            singleUserView
              ? ""
              : `
          <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
            </div>
          `
          }
            
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button ${
        post.isLiked ? "-active" : ""
      }"> Лайк </button>
              <p class="post-likes-text">
                Нравится: ${post.likes}
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.text}
            </p>
            <p class="post-date">
              ${new Date(post.createdAt).toLocaleString()}
            </p>
          </li>`;
    })
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>

                ${
                  singleUserView && posts[0]
                    ? ` <div class="posts-user-header">
                    <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${posts[0].user.name}</p>
                </div>`
                    : ""
                }

                ${posts.length === 0 ? "Постов нет" : ""}

                <ul class="posts">
                <!-- Список рендерится из JS -->
                ${tasksHtml}
                
                </ul>
                <br />
               
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      if (!user) {
        alert("Лайкать посты могут только автризованные пользователи");
        return;
      }
      toggleUserLike({ postId: likeEl.dataset.postId });
    });
  }
}
