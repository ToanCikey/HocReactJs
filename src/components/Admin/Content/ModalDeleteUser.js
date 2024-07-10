import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleDeleteUser = async () => {
    const data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      //await props.testFunction();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure a user mail :
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
