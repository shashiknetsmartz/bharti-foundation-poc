import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CommonModal from "../Common/Modal";
import * as actions from "../../Store/Actions";
import { EditFilled } from "@ant-design/icons";
import VerifyImg from '../../assets/images/verify.svg'
import ProfileImg from '../../assets/images/profile.svg'
import SecondImg from '../../assets/images/second.svg'
import FirstImg from '../../assets/images/first.svg'
import ThirdImg from '../../assets/images/third.svg'
import dropDownImg from '../../assets/images/dropDownImage.svg'

import './Dashboard.css'
import { TabsData } from "./TabsData";

const recordData = {
  name: '',
  email: '',
  schoolName: '',
  rewardPoint: '',
  image: ''
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  // To handle the modal
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const [isEdit, setIsEdit] = useState(false)
  const [values, setValue] = useState(recordData)

  const { name, email, schoolName, rewardPoint } = values;

  const dispatch = useDispatch();

  const { userData } = useSelector(
    (state) => ({
      userData: state.userReducer.userData,
    }),
    shallowEqual
  );

  // To fetch the record
  const getRecordData = () => {
    dispatch(actions.getRecord(() => { setIsLoading(false) }));
  }

  useEffect(() => {
    setIsLoading(true)
    getRecordData();
    return () => { };
  }, []);

  // Convert the image file into base64
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  // After success of post and put of record
  const handleAfterSuccess = () => {
    setIsLoading(false);
    getRecordData();
    setValue(recordData);
    handleModal(false, '')
  }

  // Check if any property is empty in payload/object
  const isEmpty = (obj) => Object.values(obj).some(value => {
    if (value == null || value == undefined || value == '') {
      return true;
    }
    return false;
  });

  const handleSubmit = async () => {
    if (isEmpty(values)) {
      alert('Please fill all the fields.')
      return;
    }
    setIsLoading(true)
    if (isEdit) {
      dispatch(actions.updateRecord(values, () => {
        handleAfterSuccess()
      }));
      return;
    }
    dispatch(actions.postRecord(values, () => {
      handleAfterSuccess();
    }));
  }

  // Handler for image only
  const handleChangeImage = async (event) => {
    const { name } = event.target;
    const fileSize = Math.round((event.currentTarget.files[0].size / 1024))
    if (fileSize >= 4096) {
      alert("File too Big, please select a file less than 4mb");
      return;
    }
    const imgUrl = await toBase64(event.currentTarget.files[0])
    setValue({ ...values, [name]: imgUrl })
  }

  // Handler for input fields
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setValue({ ...values, [name]: value })
  }

  const getModal = () => {
    switch (modalType) {
      case 'addNewMember':
        return <CommonModal title={isEdit ? "Edit Info" : "Add New Member"} show={isOpen} onClose={() => { setValue(recordData); handleModal(false, '') }} onDone={() => handleSubmit()}>
          <Container>
            <Form>
              <Row>
                <Col xs={12} md={12}>
                  {/* <DragAndDrop /> */}

                  <div className="image-upload">
                    <label for="file-input">
                      <img src={dropDownImg} /></label>
                    <input type="file" className="" name="image" onChange={handleChangeImage} />
                    <h6>Upload or Drag & Drop</h6>
                    <p className="your-files"><small>your files here</small></p>
                    <p className="file-size">Maximum upload size is 1MB</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                      name="schoolName"
                      type="text"
                      placeholder="School Name"
                      value={schoolName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Reward points</Form.Label>
                    <Form.Control
                      name="rewardPoint"
                      type="text"
                      placeholder="Reward Points"
                      value={rewardPoint}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </CommonModal>

      default:
        break;
    }
  }

  const handleModal = (isOpen, modalType) => {
    setModalType(modalType);
    setIsOpen(isOpen)
  }

  return (
    <>
      {isLoading && <div id="loader" />}
      <section className="Cards-tabs">
        <div className="container-fluid">
          <div className="row">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-tabs-daily" data-bs-toggle="tab" data-bs-target="#tabs-1" type="button" role="tab" aria-controls="tabs-1" aria-selected="true">Daily </button>
              <button className="nav-link" id="nav-tab-weekly" data-bs-toggle="tab" data-bs-target="#tabs-2" type="button" role="tab" aria-controls="tabs-2" aria-selected="false">Weekly </button>
              <button className="nav-link" id="nav-tab-monthly" data-bs-toggle="tab" data-bs-target="#tabs-3" type="button" role="tab" aria-controls="tabs-2" aria-selected="false">Monthly </button>
              <button className="add-btn ms-2" id="nav-tab-add" data-bs-toggle="tab" data-bs-target="#tabs-3" type="button" role="tab" aria-controls="tabs-2" aria-selected="false" onClick={() => handleModal(true, 'addNewMember')}><i class="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="tabs-1" role="tabpanel" aria-labelledby="tabs-tab1">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setIsEdit(true); handleModal(true, 'addNewMember') }}/>
              </div>
              <div className="tab-pane fade" id="tabs-2" role="tabpanel" aria-labelledby="tabs-2">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setIsEdit(true); handleModal(true, 'addNewMember') }}/>
              </div>
              <div className="tab-pane fade" id="tabs-3" role="tabpanel" aria-labelledby="tabs-3">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setIsEdit(true); handleModal(true, 'addNewMember') }}/>
              </div>
            </div>
          </div>
        </div>
      </section>
      {getModal()}
    </>
  );
};
