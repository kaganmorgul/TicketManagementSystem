import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// user
import ApplicationSuccessful from "components/User/ApplicationSuccessful/ApplicationSuccessful";
import ApplicationDetail from "components/User/ApplicationDetail/ApplicationDetail";
import CreateApplication from "components/User/CreateApplication/CreateApplication";
import SearchApplication from "components/User/SearchApplication/SearchApplication";
import PageNotFound from "components/User/PageNotFound/PageNotFound";
import User from "components/User/User";
// admin
import AdminLogin from "components/Admin/AdminLogin/AdminLogin";
import Admin from "components/Admin/Admin";
import AdminApplicationList from "components/Admin/AdminApplicationList/AdminApplicationList";
import AdminApplicationDetail from "components/Admin/AdminApplicationDetail/AdminApplicationDetail";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* user pages */}
          <Route path="/" element={<User />}>
            <Route index element={<CreateApplication />} />
            <Route path="basvuru-olustur" element={<CreateApplication />} />
            <Route path="basvuru-sorgula" element={<SearchApplication />} />
            <Route path="basvuru/:id" element={<ApplicationDetail />} />
          </Route>

          {/* admin pages */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminApplicationList />} />
            <Route path="basvuru/:id" element={<AdminApplicationDetail />} />
            <Route path="basvuru-listesi" element={<AdminApplicationList />} />
          </Route>

          <Route path="basvuru-basarili" element={<ApplicationSuccessful />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
