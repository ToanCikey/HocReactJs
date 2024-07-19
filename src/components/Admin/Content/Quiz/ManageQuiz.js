import { useState, useEffect } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateSubmitQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalDeleteQuiz from "./ModalDeleteQuiz.js";
import QuizQA from "./QuizQA.js";
import { getAllQuizzesForAdmin } from "../../../../services/apiServices.js";
import ModalUpdateQuiz from "./ModalUpdateQuiz.js";
import AssignQuiz from "./AssignQuiz.js";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDeclaration] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [listQuizzes, setListQuizzes] = useState([]);

  useEffect(() => {
    handleGetAllQuizzes();
  }, []);
  const handleGetAllQuizzes = async () => {
    let res = await getAllQuizzesForAdmin();
    if (res && res.EC === 0) {
      setListQuizzes(res.DT);
    }
  };
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    let res = await postCreateSubmitQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      handleGetAllQuizzes();
      toast.success(res.EM);
      setName("");
      setDeclaration("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };
  const handleClickDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };
  const handleClickUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <label className="add-new_label">Add new Quiz</label>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(event) => setDeclaration(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  defaultValue={type}
                  onChange={setType}
                  options={options}
                />
              </div>
              <div className="mb-3 more-actions">
                <label className="form-label">Upload Image</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => handleChangeFile(event)}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="list-detail">
              <TableQuiz
                handleClickDeleteQuiz={handleClickDeleteQuiz}
                listQuizzes={listQuizzes}
                handleClickUpdateQuiz={handleClickUpdateQuiz}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Update Q/A Quiz</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Assign to User</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        handleGetAllQuizzes={handleGetAllQuizzes}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        handleGetAllQuizzes={handleGetAllQuizzes}
      />
    </div>
  );
};
export default ManageQuiz;
