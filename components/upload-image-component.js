import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
  <div class="upload=image">
      ${
        imageUrl
          ? `
          <div style="display:flex; align-items: center;">
            <img style="width: 100px; height: 100px; object-fit: cover; margin-right: 5px" src="${imageUrl}">
            <button class="remove-image button">Удалить</button>
          </div>
          `
          : `
            <label class="file-upload-label button" style="display: inline-block;">
                <input
                  type="file"
                  class="image-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

    const fileInputElement = element.querySelector(".image-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    element.querySelector(".remove-image")?.addEventListener("click", () => {
      imageUrl = "";
      onImageUrlChange(imageUrl);
      render();
    });
  };

  render();
}
