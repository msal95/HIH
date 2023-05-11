import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default function CustomModal(props) {
  const {
    show,
    toggleModal,
    onDiscard,
    children,
    modalClass = "modal-fullscreen",
  } = props;
  return (
    <Modal
      isOpen={show}
      onClosed={onDiscard}
      toggle={toggleModal}
      className={`modal-dialog-centered ${modalClass}`}
    >
      <ModalHeader
        className="bg-transparent"
        toggle={toggleModal}
      ></ModalHeader>
      <ModalBody className="pb-5 px-0">{children}</ModalBody>
    </Modal>
  );
}
