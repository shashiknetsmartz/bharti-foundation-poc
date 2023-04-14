import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './common.css'
const CommonModal = ({ title, show, onClose, onDone, children }) => {
    const [show1, setShow] = useState(false);

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    <Button onClick={onClose} ><i className="fa fa-times" aria-hidden="true"></i></Button>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='close-btn' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="save-btn" onClick={onDone}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CommonModal;