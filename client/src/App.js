import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import AddBlogPage from "./pages/AddBlogPage";

function App() {
  return (
    <div className={`w-full`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="add-blog" element={<AddBlogPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
