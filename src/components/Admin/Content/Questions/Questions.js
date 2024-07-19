import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import {
  getAllQuizzesForAdmin,
  postCreateNewAnswerQuiz,
  postCreateNewQuestionQuiz,
} from "../../../../services/apiServices.js";

const Questions = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isShowImage, setIsShowImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    url: "",
    title: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    handleGetAllQuizzes();
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

  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const [questions, setQuestion] = useState(initQuestions);
  const handleSaveQuestion = async () => {
    //validate quiz
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please select quiz");
      return;
    }

    //validate answers
    let isValidateAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidateAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidateAnswer === false) {
        break;
      }
    }
    if (isValidateAnswer === false) {
      toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }
    //validate questions
    let isValidateQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidateQuestion = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidateQuestion === false) {
      toast.error(`Not Empty description for Question ${indexQ1 + 1}`);
      return;
    }
    //submit api
    for (const question of questions) {
      const q = await postCreateNewQuestionQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerQuiz(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create question and answer succed!");
    setQuestion(initQuestions);
    // await Promise.all(
    //   questions.map(async (question) => {
    //     const q = await postCreateNewQuestionQuiz(
    //       +selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );
    //     await Promise.all(
    //       question.answers.map(async (answer) => {
    //         await postCreateNewAnswerQuiz(
    //           answer.description,
    //           answer.isCorrect,
    //           q.DT.id
    //         );
    //       })
    //     );
    //   })
    // );
  };
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestion([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestion(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestion(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestion(questionsClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestion(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestion(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestion(questionsClone);
    }
  };
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImage({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsShowImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="mb-3 description">
                    <label>Question {index + 1} description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={question.description}
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                  </div>
                  <div className="group-upload">
                    <label className="form-label" htmlFor={`${question.id}`}>
                      <RiImageAddFill />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      className="form-control"
                      hidden
                      onChange={(event) =>
                        handleOnChangeFileQuestion(question.id, event)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <FiPlusCircle className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <FiMinusCircle className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="mb-3 answer-name ">
                          <label>Answer {index + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <FiPlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <FiMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSaveQuestion()}
            >
              Save Question
            </button>
          </div>
        )}
        {isShowImage === true && (
          <Lightbox
            image={dataImage.url}
            title={dataImage.title}
            onClose={() => setIsShowImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default Questions;
