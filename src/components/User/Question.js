import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
const Question = (props) => {
  const { data, index, isShowAnswer } = props;
  const [isShowImage, setIsShowImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleCheckbox = (event, aId, qId) => {
    props.handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            alt="anh"
            onClick={() => setIsShowImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
          />
          {isShowImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question"}
              onClose={() => setIsShowImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"> </div>
      )}
      <div className="question">
        Question {index + 1}:{data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    disabled={props.isSubmitQuiz}
                    onChange={(event) =>
                      handleCheckbox(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                  {isShowAnswer === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
