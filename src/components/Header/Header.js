import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../../services/apiServices";
import { doLogin, doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Language from "./Language";
import Profile from "./Profile";
import { useState } from "react";
const Header = () => {
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogOut = async () => {
    let res = await postLogOut(account.email, account.refresh_token);
    //clean data redux

    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home">Nguyen Van Toan</Navbar.Brand> */}
          <NavLink className="navbar-brand" to="/">
            Nguyen Van Toan
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/user">
                User
              </NavLink>
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    Log in
                  </button>
                  <button
                    className="btn-signup btn btn-dark"
                    onClick={() => handleRegister()}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={isShowModalProfile} setShow={setIsShowModalProfile} />
    </>
  );
};

export default Header;
