import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiServices";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleCreateRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalidate Email");
      return;
    }
    if (!password) {
      toast.error("Invalidate Password");
      return;
    }
    let data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="title col-4 mx-auto">NguyenVanToan</div>
      <div className="welcome col-4 mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email(*)</label>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password(*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Password"
            className="form-control "
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="form-group">
          <label>Username(*)</label>
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button
            className="btn-register"
            onClick={() => handleCreateRegister()}
          >
            Create my free count
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;&#60;Go to HomePage</span>
        </div>
      </div>
    </div>
  );
};
export default Register;
