import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import AddBlogPage from "./pages/AddBlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className={`w-full`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="setting"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="add-blog"
            element={
              <PrivateRoute>
                <AddBlogPage />
              </PrivateRoute>
            }
          />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route
            path="my-blogs"
            element={
              <PrivateRoute>
                <MyBlogsPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
