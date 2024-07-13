import videoHomePage from "../../assert/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-component ">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-content_text1">
          Make forms worth filling out
        </div>
        <div className="homepage-content_text2">
          Get more data—like signups, feedback, and anything <br />
          else—with forms designed to be refreshingly different.
        </div>
        <div className="homepage-content_text3">
          {isAuthenticated === false ? (
            <button className="btn btn-dark" onClick={() => navigate("/login")}>
              Get started—it's free
            </button>
          ) : (
            <button className="btn btn-dark" onClick={() => navigate("/user")}>
              Dong Quiz Now!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
