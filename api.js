const baseHost = "http://localhost:3000";
// const baseHost = "https://webdev-hw-api.vercel.app";
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
  return fetch(baseHost + "/api/user", {
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
  return fetch(baseHost + "/api/user/login", {
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

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}
