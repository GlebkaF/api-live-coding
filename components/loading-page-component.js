import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderLoadingPageComponent({ appEl, user, goToPage }) {
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="loading-page">
                  <div class="lds-facebook"><div></div><div></div><div></div></div>
                </div>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    user,
    element: document.querySelector(".header-container"),
    goToPage,
  });
}
