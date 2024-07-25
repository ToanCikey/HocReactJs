import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User.js";
import Admin from "./components/Admin/Admin.js";
import HomePage from "./components/Home/HomePage.js";
import Dashboard from "./components/Admin/Content/DashBoard.js";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import Login from "./components/Auth/Login.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register.js";
import ListQuiz from "./components/User/ListQuiz.js";
import DetailQuiz from "./components/User/DetailQuiz.js";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz.js";
import Questions from "./components/Admin/Content/Questions/Questions.js";
import PrivateRoute from "./routes/PrivateRoute.js";
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      Not found data with your current URL
    </div>
  );
};
const LayOut = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default LayOut;
