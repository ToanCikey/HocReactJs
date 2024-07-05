import videoHomePage from "../../assert/video-homepage.mp4";
const HomePage = (props) => {
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
          <button className="btn btn-dark">Get started—it's free</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
