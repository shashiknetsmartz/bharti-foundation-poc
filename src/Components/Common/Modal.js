import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const CommonModal = ({ title, show, onClose, onDone, children }) => {
    const [show1, setShow] = useState(false);

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onDone}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CommonModal;