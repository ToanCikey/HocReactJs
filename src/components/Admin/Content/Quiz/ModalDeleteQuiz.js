import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";
const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDeleteQuiz } = props;

  const handleClose = () => setShow(false);
  const handleDeleteQuiz = async () => {
    let res = await deleteQuiz(dataDeleteQuiz.id);
    if (res && res.EC === 0) {
      props.handleGetAllQuizzes();
      toast.success(res.EM);
      handleClose();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure a quiz id:
          {dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
