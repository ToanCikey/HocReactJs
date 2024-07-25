import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainInfo from "./MainInfo";
import PassWord from "./PassWord";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Quan Ly Thong tin ca nhan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="MainInfo">
            <MainInfo setShow={setShow} />
          </Tab>
          <Tab eventKey="profile" title="PassWord">
            <PassWord setShow={setShow} />
          </Tab>
          <Tab eventKey="contact" title="History">
            <History />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};
export default Profile;
