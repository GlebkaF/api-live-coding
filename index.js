// План
// 1. Реализовать форму логина в приложении (+)
//  * Перенести всю разметку в рендер функцию (+)
//  * Сделать форму входа динамическй (+)
//  * отрефакторить приложение на модули
//    * api (+)
//    * вытищть логин компонент в отдельный модуль (+)
//    * TODO: вытащить компонент списка задач и форму добавления в отдельный модуль
// 2. Реализовать форму регистрации (+)

import { addTodo, deleteTodo, getTodos } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";
let tasks = [];

let user = null;

// user = {
//   _id: "6421860c32e0301869fb3301",
//   login: "admin",
//   name: "Глеб Админ",
//   password: "admin",
//   token: "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
// };

// "Bearer asb4c4boc86gasb4c4boc86g37k3bk3cg3c03ck3k37w3cc3bo3b8";
// user = null;

let showAddPost = false;

// 'main' | 'auth' | 'aasd'
let page = "main";

const fetchTodosAndRender = () => {
  return getTodos({ token: `Bearer ${user.token}` }).then((responseData) => {
    tasks = responseData.todos;
    renderApp();
  });
};

const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === "auth") {
    renderLoginComponent({
      appEl,
      setUser: (newToken) => {
        user = newToken;
        page = "main";
        renderApp();
      },
      renderApp,
    });

    return;
  }

  const src = "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg";

  const posts = [
    {
      id: "1111",
      imageUrl: "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg",
      text: "Это я, сижу и пью чай в пышечной в Новосибисрке",
      createdAt: new Date("2023-01-02T08:19:00.916Z"),
      likes: [
        {
          name: "Костя",
          login: "kv",
        },
        {
          name: "Анна",
          login: "ap",
        },
        {
          name: "Глеб Админ",
          login: "admin",
        },
      ],
      user: {
        id: "gf",
        name: "Глеб Админ",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBU1pvapd3uB42CStKcS-yZmCrmrC_XSgUDrSYRS5Rw&s",
      },
    },
    {
      id: "2222",
      imageUrl:
        "https://m.buro247.ru/images/senina/aiony-haust-3TLl_97HNJo-unspl.jpg",
      text: "Это кто-то",
      createdAt: new Date("2022-01-02T08:19:00.916Z"),
      likes: [
        {
          name: "Костя",
          login: "kv",
        },
        {
          name: "Анна",
          login: "ap",
        },
      ],
      user: {
        id: "ap",
        name: "Анна Полунина",
        imageUrl:
          "https://pbs.twimg.com/profile_images/2661781934/f18184b33821c97cb91af47497091c86_400x400.jpeg",
      },
    },
  ];

  const tasksHtml = posts
    .map((post) => {
      return `
          <li class="post">
            <div class="post-header" data-user-id="${post.user.id}">
                <img src="${
                  post.user.imageUrl
                }" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button ${
        post.likes.some((like) => like.login === user?.login) ? "-active" : ""
      }"> Лайк </button>
              <p class="post-likes-text">
                Нравится: ${post.likes.length}
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.text}
            </p>
            <p class="post-date">
              ${post.createdAt.toLocaleString()}
            </p>
          </li>`;
    })
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="page-header">
                  <h1 class="logo">Instapro</h1>
                  <button class="header-button">
                  ${user ? `Добавить пост (${user.name})` : "Войти"}
                  </button>
                  
                  
                </div>

                <ul class="posts">
                <!-- Список рендерится из JS -->
                ${tasksHtml}
                </ul>
                <br />
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
                <br />
                <button class="button" id="add-button">Добавить</button>
                </div>
              </div>`;

  appEl.innerHTML = appHtml;

  appEl.querySelector(".header-button").addEventListener("click", () => {
    if (user) {
      alert("Идем добавлять пост");
    } else {
      page = "auth";
      renderApp();
    }
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      alert("Клик по юзеру: " + userEl.dataset.userId);
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      console.log(likeEl.dataset);
      alert("Клик по лайку " + likeEl.dataset.postId);
    });
  }
};

if (!user) {
  renderApp();
} else {
  renderApp();
}
