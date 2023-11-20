import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/login/sign-in";
import SignUp from "./pages/login/sign-up";
import RegisterPost from "./pages/registerPost";
import Login from "./pages/login";
import Post from "./pages/post";
import Chat from "./pages/chat";
import UserDetail from "./pages/userDeatail";
import MyPage from "./pages/mypage";
import RegisterProfile from "./pages/RegisterProfile";
import AccountInfoEdit from "./pages/mypage/accountInfo";
import DeleteAccount from "./pages/mypage/accountInfo/delete";
import MailEdit from "./pages/mypage/accountInfo/mailEdit";
import Request from "./pages/request";
import Report from "./pages/report";
import ReportUser from "./pages/report/user";
import ProfileEdit from "./pages/mypage/accountInfo/profileEdit";
import { SearchResult } from "./pages/home/searchResult";
import EditPost from "./pages/mypage/mypost/editPost";
import TermsOfservice from "./pages/login/terms-of-service";
import PrivacyPolicy from "./pages/login/privacy-policy";
import ResetPasswordInput from "./pages/mypage/accountInfo/resetPassword/input";
import ResetPassword from "./pages/mypage/accountInfo/resetPassword";
import styled from "styled-components";

const RooteWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, “Helvetica Neue”, Arial,
    “Hiragino Kaku Gothic ProN”, “Hiragino Sans”, Meiryo, sans-serif;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search/searchText=/:searchText",
    element: <SearchResult />,
  },
  {
    path: "/searchResult",
    element: <SearchResult />,
  },
  {
    path: "register",
    element: <RegisterPost />,
  },
  {
    path: "post/:postId",
    children: [
      // New blog index route
      { index: true, element: <Post /> },
      // Blog subapp splat route added for /blog/posts matching
      { path: "chat/:userId", element: <Chat /> },
      { path: "report", element: <Report /> },
    ],
  },
  {
    path: "user/detail/:userId",
    children: [
      // New blog index route
      { index: true, element: <UserDetail /> },
      // Blog subapp splat route added for /blog/posts matching
      { path: "report", element: <ReportUser /> },
    ],
  },
  {
    path: "login",
    children: [
      // New blog index route
      { index: true, element: <Login /> },
      // Blog subapp splat route added for /blog/posts matching
      {
        path: "",
        children: [
          { index: true, element: <SignUp /> },
          {
            path: "terms-of-service",
            element: <TermsOfservice />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
        ],
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "register-profile",
    element: <RegisterProfile />,
  },
  {
    path: "request",
    element: <Request />,
  },
  {
    path: "mypage",
    children: [
      // New blog index route
      { index: true, element: <MyPage /> },
      // Blog subapp splat route added for /blog/posts matching
      { path: "edit/:postId", element: <EditPost /> },
      {
        path: "accountInfoEdit/:userId",
        children: [
          // New blog index route
          { index: true, element: <AccountInfoEdit /> },
          // Blog subapp splat route added for /blog/posts matching
          {
            path: "profile",
            element: <ProfileEdit />,
          },
          {
            path: "mail",
            element: <MailEdit />,
          },
          {
            path: "resetPassword",
            children: [
              // New blog index route
              { index: true, element: <ResetPassword /> },
              {
                path: "input",
                element: <ResetPasswordInput />,
              },
            ],
          },
          {
            path: "delete",
            element: <DeleteAccount />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RooteWrapper>
      <RouterProvider router={router} />
    </RooteWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
