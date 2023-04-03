import { ADD_POSTS_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element, goToPage }) {
  element.innerHTML = `
  <div class="page-header">
      <button class="to-main-page">На главную</button>
      <button class="add-post">Добавить пост</button>
  </div>
`;

  element.querySelector(".to-main-page").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  element.querySelector(".add-post").addEventListener("click", () => {
    goToPage(ADD_POSTS_PAGE);
  });
}
