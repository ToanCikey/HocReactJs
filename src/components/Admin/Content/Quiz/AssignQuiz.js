import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizzesForAdmin,
  getALLUsers,
  postAssignQuiz,
} from "../../../../services/apiServices.js";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectUser] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    handleGetAllQuizzes();
    handleGetAllUser();
  }, []);

  const handleGetAllQuizzes = async () => {
    let res = await getAllQuizzesForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const handleGetAllUser = async () => {
    let res = await getALLUsers();
    console.log(res);
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };
  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectUser}
          options={listUser}
        />
      </div>
      <div>
        <button onClick={() => handleAssign()} className="btn btn-warning mt-3">
          Assign
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
