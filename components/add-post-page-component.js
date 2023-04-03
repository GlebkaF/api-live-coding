import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, user, goToPage, addPost }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Форма добавления</h3>
        <div class="form-row">
            Что нужно сделать:
            <input
            type="text"
            id="text-input"
            class="input"
            placeholder="Выпить кофе"
            />
        </div>
        
        <div class="upload-image-container"></div>
        
        <button class="button"  id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: appEl.querySelector(".header-container"),
      user,
      goToPage,
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
        const textInputElement = document.getElementById("text-input");

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
