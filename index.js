import { addPost, getPosts, getUserPosts, toogleLike } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
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

user = {
  _id: "6421860c32e0301869fb3301",
  login: "admin",
  name: "Глеб Админ",
  password: "admin",
  token: "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
};

let page = POSTS_PAGE;
let posts = [];

const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

const toggleUserLike = ({ postId }) => {
  console.log({ postId });
  toogleLike({ token: getToken(), id: postId }).then(() => {
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      if (posts[index].isLiked) {
        posts[index].likes -= 1;
      } else {
        posts[index].likes += 1;
      }

      posts[index].isLiked = !posts[index].isLiked;
      renderApp();
    }
  });
};

const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      page = LOADING_PAGE;
      renderApp();

      return getUserPosts({ token: getToken(), userId: data.userId }).then(
        (newPosts) => {
          page = USER_POSTS_PAGE;
          posts = newPosts;
          renderApp();
        }
      );
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
      addPost({ text, imageUrl }) {
        goToPage(LOADING_PAGE);

        addPost({
          token: getToken(),
          text,
          imageUrl,
        })
          .then(() => {
            goToPage(POSTS_PAGE);
          })
          .catch((error) => {
            console.error(error);
            goToPage(ADD_POSTS_PAGE);
            alert(error.message);
          });
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
      user,
      goToPage,
      posts,
      singleUserView: false,
      toggleLike: toggleUserLike,
    });
  }

  if (page === USER_POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
      user,
      goToPage,
      posts,
      singleUserView: true,
      toggleLike: toggleUserLike,
    });
  }
};

goToPage(POSTS_PAGE);
