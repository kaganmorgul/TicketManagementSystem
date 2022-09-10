import "./AdminLogin.scss";
import { useContext, useEffect, useState } from "react";
import Context from "context/Context";
import { auth } from "config/FirebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const authData = useContext(Context);
  const [tryy, setTryy] = useState(0);
  const [lock, setLock] = useState(false);

  //   login
  const Login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        authData.adminEmail,
        authData.adminPassword
      );
      authData.setLogin(true);
      navigate("/admin");
      console.log(user);
    } catch (error) {
      alert("Şifre Hatalı");
    }
  };
  const control = () => {
    setTryy((tryy) => tryy + 1);
  };
  useEffect(() => {
    tryy === 3 && setLock(true);
  }, [tryy]);

  useEffect(() => {
    if (tryy === 3) {
      setTimeout(() => {
        setTryy(true);
      }, 5000);
    }
  });

  return (
    <div className="AdminLogin">
      <form className="AdminLogin__form" onSubmit={Login}>
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => authData.setAdminEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => authData.setAdminPassword(e.target.value)}
        />
        <button disabled={lock} type="submit" onClick={control}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
