import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";

let user = null;

let page = POSTS_PAGE;
let posts = [];

const goToPage = (newPage) => {
  if (newPage === ADD_POSTS_PAGE) {
    page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
    renderApp();
    return;
  }

  if (newPage === POSTS_PAGE) {
    page = POSTS_PAGE;
    posts = [
      {
        id: "1",
        imageUrl: "https://99px.ru/sstorage/53/2020/11/tmb_317517_518911.jpg",
        text: "Это я, сижу и пью чай в пышечной в Новосибисрке",
        createdAt: new Date("2023-01-02T08:19:00.916Z"),
        likes: 3,
        isLiked: false,
        user: {
          id: "gf",
          name: "Глеб Админ",
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLBU1pvapd3uB42CStKcS-yZmCrmrC_XSgUDrSYRS5Rw&s",
        },
      },
    ];
    renderApp();

    return;
  }

  page = newPage;
  renderApp();
};

const renderApp = () => {
  const appEl = document.getElementById("app");

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
      user,
      goToPage,
      posts,
    });
  }
};

goToPage(AUTH_PAGE);
