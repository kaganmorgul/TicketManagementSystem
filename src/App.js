import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// user
import ApplicationSuccessful from "./pages/user/ApplicationSuccessful/ApplicationSuccessful";
import ApplicationDetail from "./pages/user/ApplicationDetail/ApplicationDetail";

import CreateApplication from "./pages/user/CreateApplication/CreateApplication";
import SearchApplication from "./pages/user/SearchApplication/SearchApplication";
import PageNotFound from "./pages/user/PageNotFound/PageNotFound";
import User from "./components/User/User";

// admin
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin";
import Admin from "./components/Admin/Admin";
import AdminApplicationList from "./pages/admin/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetail from "./pages/admin/AdminApplicationDetail/AdminApplicationDetail";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminApplicationList />} />
            <Route path="basvuru/:id" element={<AdminApplicationDetail />} />
            <Route path="basvuru-listesi" element={<AdminApplicationList />} />
          </Route>
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="/" element={<User />}>
            <Route index element={<CreateApplication />} />
            <Route path="basvuru-olustur" element={<CreateApplication />} />
            <Route path="basvuru-sorgula" element={<SearchApplication />} />
          </Route>
          <Route path="basvuru/:id" element={<ApplicationDetail />} />
          <Route path="basvuru-basarili" element={<ApplicationSuccessful />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
