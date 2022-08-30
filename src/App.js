import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// user
import BasvuruBasarili from "./pages/user/BasvuruBasarili";
import BasvuruDetay from "./pages/user/BasvuruDetay";
import BasvuruOlustur from "./pages/user/BasvuruOlustur";
import BasvuruSorgula from "./pages/user/BasvuruSorgula";
import PageNotFound from "./pages/user/PageNotFound";
import User from "./components/User/User";
// admin
import AdminLogin from "./pages/admin/AdminLogin";
import Admin from "./components/Admin/Admin";
import AdminBasvuruListesi from "./pages/admin/AdminBasvuruListesi";
import AdminBasvuruDetay from "./pages/admin/AdminBasvuruDetay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminBasvuruListesi />} />
            <Route path="basvuru/:id" element={<AdminBasvuruDetay />} />
            <Route path="basvuru-listesi" element={<AdminBasvuruListesi />} />
          </Route>
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="/" element={<User />}>
            <Route index element={<BasvuruOlustur />} />
            <Route path="basvuru-olustur" element={<BasvuruOlustur />} />
            <Route path="basvuru-sorgula" element={<BasvuruSorgula />} />
          </Route>
          <Route path="basvuru/:id" element={<BasvuruDetay />} />
          <Route path="basvuru-basarili" element={<BasvuruBasarili />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
