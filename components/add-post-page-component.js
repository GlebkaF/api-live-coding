import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, user, goToPage, addPost }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Создать пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container"></div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button"  id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: appEl.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document
      .getElementById("add-button")
      .addEventListener("click", async () => {
        const textInputElement = document.querySelector("textarea");

        if (!imageUrl) {
          alert("Не указано фото");
          return;
        }

        if (!textInputElement.value) {
          alert("Не заполнено описание фото");
          return;
        }

        addPost({
          text: textInputElement.value,
          imageUrl,
        });
      });
  };

  render();
}
