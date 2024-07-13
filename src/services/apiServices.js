import axios from "../utils/axiosCustomize";
const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
const getALLUsers = () => {
  return axios.get("api/v1/participant/all");
};
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password, delay: 5000 });
};
const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
export {
  postCreateUser,
  getALLUsers,
  putUpdateUser,
  deleteUser,
  getUserPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
