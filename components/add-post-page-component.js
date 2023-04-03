import { postImage } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, user, goToPage, addPost }) {
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
        <div class="form-row">
          Фотография
          <input
          type="file"
          id="image-input"
          class="input"
          placeholder="Выпить кофе"
          />
      </div>
        <br />
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
    user,
    goToPage,
  });

  document.getElementById("add-button").addEventListener("click", async () => {
    const textInputElement = document.getElementById("text-input");
    const fileInputElement = document.getElementById("image-input");
    console.log(fileInputElement);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const file = fileInputElement.files[0];
    console.log({ file });
    postImage({ file });

    // if (!textInputElement.value) {
    //   return alert("Заполните текст");
    // }

    // addPost({
    //   text: textInputElement.value,
    //   imageUrl: "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg",
    // });
  });
}
