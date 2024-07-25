import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your Result ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Question:<b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answers:<b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              props.handleShowAnswer();
            }}
          >
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
