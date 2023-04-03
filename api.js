const host = "https://webdev-hw-api.vercel.app/api/v2/comments/";

const baseHost = "https://webdev-hw-api.vercel.app";
const commentsHost = baseHost + "/api/v2/gleb-fokin";

export function getPosts({ token }) {
  return fetch(commentsHost + "/comments", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
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
      return data.comments.map((comment) => {
        return {
          id: comment.id,
          imageUrl: "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg",
          text: comment.text,
          createdAt: comment.date,
          likes: comment.likes,
          isLiked: comment.isLiked,
          user: {
            id: "gf",
            name: comment.author.name,
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBU1pvapd3uB42CStKcS-yZmCrmrC_XSgUDrSYRS5Rw&s",
          },
        };
      });
    });
}

export function getUserPosts({ token, userId }) {
  return fetch(commentsHost + "/comments", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.comments.map((comment) => {
        return {
          id: comment.id,
          imageUrl: "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg",
          text: comment.text,
          createdAt: comment.date,
          likes: comment.likes,
          isLiked: comment.isLiked,
          user: {
            id: "gf",
            name: comment.author.name,
            imageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBU1pvapd3uB42CStKcS-yZmCrmrC_XSgUDrSYRS5Rw&s",
          },
        };
      });
    });
}

export function addPost({ token, text, imageUrl }) {
  return fetch(commentsHost + "/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Ошибка сервера");
    }

    if (response.status === 400) {
      throw new Error("Неверный запрос");
    }
  });
}

export function toogleLike({ id, token }) {
  return fetch(commentsHost + "/comments/" + id + "/toggle-like", {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Ошибка сервера");
    }

    if (response.status === 400) {
      throw new Error("Неверный запрос");
    }
  });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}
