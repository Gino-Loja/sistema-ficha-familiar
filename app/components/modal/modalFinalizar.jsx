import Modal from "react-bootstrap/Modal";
export default function ModalFinalizar(props) {
  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body d-flex flex-column justify-content-between align-items-center">
        <img
          src="/icons8-check.svg"
          
          className="img-fluid"
          width={"90px"}
          height={"90px"}
        ></img>
        {props.tittle}
      </Modal.Body>
      <Modal.Footer className="align-items-center justify-content-center">
        {props.children}
      </Modal.Footer>
    </Modal>
  );
}
