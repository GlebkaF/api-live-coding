import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element, user, goToPage }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">Instapro</h1>
      <button class="header-button">
      ${user ? `Добавить пост (${user.name})` : "Войти"}
      </button>
  </div>
`;

  element.querySelector(".header-button").addEventListener("click", () => {
    if (user) {
      goToPage(ADD_POSTS_PAGE);
    } else {
      goToPage(AUTH_PAGE);
    }
  });

  element.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });
}
