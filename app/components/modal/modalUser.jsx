import Modal from "react-bootstrap/Modal";
export default function ModalUser(props) {
  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body d-flex flex-column justify-content-between align-items-center">
        
        {props.tittle}
      </Modal.Body>
      <Modal.Footer className="align-items-center justify-content-center">
        {props.children}
      </Modal.Footer>
    </Modal>
  );
}
