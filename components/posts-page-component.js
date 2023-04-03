import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderPostsPageComponent({ appEl, user, goToPage, posts }) {
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>

               Компонент главной страницы
               <pre>${posts.map((post) => `Элемент списка: ${post.text}`)}</pre>

              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    user,
    element: document.querySelector(".header-container"),
    goToPage,
  });
}
