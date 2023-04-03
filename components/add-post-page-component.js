import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, user, goToPage }) {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      Это страница с формой добавления
    </div>
  `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
    user,
    goToPage,
  });
}
