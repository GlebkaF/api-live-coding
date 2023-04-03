import { getPosts, getUserPosts } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderHeaderComponent } from "./components/header-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";

let user = null;

// user = {
//   _id: "6421860c32e0301869fb3301",
//   login: "admin",
//   name: "Глеб Админ",
//   password: "admin",
//   token: "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
// };

let page = POSTS_PAGE;
let posts = [];

const goToPage = (newPage, data) => {
  const token = user ? `Bearer ${user.token}` : undefined;
  if (
    [POSTS_PAGE, AUTH_PAGE, ADD_POSTS_PAGE, USER_POSTS_PAGE].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token }).then((newPosts) => {
        page = POSTS_PAGE;
        posts = newPosts;
        renderApp();
      });
    }

    if (newPage === USER_POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getUserPosts({ token, userId: data.userId }).then((newPosts) => {
        page = USER_POSTS_PAGE;
        posts = newPosts;
        renderApp();
      });
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newToken) => {
        user = newToken;
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
      singleUserView: false,
    });
  }

  if (page === USER_POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
      user,
      goToPage,
      posts,
      singleUserView: true,
    });
  }
};

goToPage(POSTS_PAGE);
