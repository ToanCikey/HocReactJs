import NavDropdown from "react-bootstrap/NavDropdown";

const Language = () => {
  return (
    <>
      <NavDropdown title="Việt Nam" id="basic-nav-dropdown">
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
