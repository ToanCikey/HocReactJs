import { useState } from "react";
import "./Login.scss";
import { postLogin } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalidate Email");
      return;
    }
    if (!password) {
      toast.error("Invalidate Password");
      return;
    }
    //submit api
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">NguyenVanToan</div>
      <div className="welcome col-4 mx-auto">Hello,who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span>Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login to Nguyen Van Toan
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;&#60;Go to HomePage</span>
        </div>
      </div>
    </div>
  );
};
export default Login;
