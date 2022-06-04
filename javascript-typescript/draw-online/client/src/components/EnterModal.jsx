import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EnterModal = ({ isOpen, connectHandler, usernameRef }) => {
  return (
    <>
      <Modal show={isOpen} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EnterModal;
