import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { validateAddCompanyInputs } from "../../Helpers/FormValidations/AddRecordValidations";
import CommonModal from "../Common/Modal";
import * as actions from "../../Store/Actions";
import dropDownImg from '../../assets/images/dropDownImage.svg'

import './Dashboard.css'
import { TabsData } from "./TabsData";
import DragAndDrop from "../Common/DragAndDrop";

const recordData = {
  name: '',
  email: '',
  schoolName: '',
  rewardPoint: '',
  image: '',
  location: ''
}

const defaultData = [
  {
    "name": "Rambo",
    "email": "rambo@gmail.com",
    "schoolName": "Delhi Public school, delhi.",
    "rewardPoint": "1200",
    "id": 1,
    "image": "",
    "location": "piunjab,india"
  },
  {
    "name": "Sahil",
    "email": "sahil@gmail.com",
    "schoolName": "Delhi Public school, delhi.",
    "rewardPoint": "2345",
    "id": 2,
    "image": "",
    "location": "piunjab,india"
  },
  {
    "name": "Rohan",
    "email": "rohan@gmail.com",
    "schoolName": "Delhi Public school, delhi.",
    "rewardPoint": "5678",
    "id": 3,
    "image": "",
    "location": "piunjab,india"
  },
  {
    "name": "Mohan",
    "email": "mohan@gmail.com",
    "schoolName": "Delhi Public school, delhi.",
    "rewardPoint": "9000",
    "id": 4,
    "image": "",
    "location": "piunjab,india"
  },
  {
    "name": "Prince",
    "email": "prince@gmail.com",
    "schoolName": "Delhi Public school, delhi.",
    "rewardPoint": "10000",
    "id": 5,
    "image": "",
    "location": "piunjab,india"
  }
]

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  // To handle the modal
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')

  const [selectedId, setSelectedId] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [values, setValue] = useState(recordData)
  const [errors, setErrors] = useState('');

  const { name, email, schoolName, rewardPoint, location } = values;

  const dispatch = useDispatch();

  const { userData1 } = useSelector(
    (state) => ({
      userData: state.userReducer.userData,
    }),
    shallowEqual
  );

  const userData = JSON.parse(localStorage.getItem('data'))?.sort((a, b) => b.rewardPoint - a.rewardPoint)?.map((item, ind) => ({ ...item, rank: ind + 1 }))
  
  // To fetch the record
  const getRecordData = () => {
    dispatch(actions.getRecord(() => { setIsLoading(false) }));
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('data'))?.length > 0) {
      localStorage.setItem('data', localStorage.getItem('data'))
      return;
    }
    localStorage.setItem('data', JSON.stringify(defaultData))
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
    setValue(recordData);
    handleModal(false, '')
    setErrors('')
  }

  // Not in use: Check if any property is empty in payload/object
  const isEmpty = (obj) => Object.values(obj).some(value => {
    if (value == null || value == undefined || value == '') {
      return true;
    }
    return false;
  });

  const isValid = (val) => {
    // console.log("val---------------", val);
    const { errors, isValid } = validateAddCompanyInputs(val);
    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!isValid(values)) {
      return;
    }
    if (isEdit) {
      const updateData = [...JSON.parse(localStorage.getItem('data'))].map(item => {
        if (item.id == selectedId) {
          return { ...item, ...values }
        }
        return item;
      })
      localStorage.setItem('data', JSON.stringify(updateData))
      setIsEdit(false)
      handleAfterSuccess();
      return;
    }
    if([...JSON.parse(localStorage.getItem('data'))].map(item => item.email).includes(values.email)){
      setErrors({email: 'Email already exist.'})
      return
    }
    const updateLS = [...JSON.parse(localStorage.getItem('data')), { ...values, id: userData?.length + 1 }]
    localStorage.setItem('data', JSON.stringify(updateLS))
    handleAfterSuccess();
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
        return <CommonModal title={isEdit ? "Edit Info" : "Add New Member"} show={isOpen} onClose={() => { setValue(recordData); handleModal(false, ''); setErrors('') }} onDone={() => handleSubmit()}>
          <Container>
            <Form>
              <Row>
                <Col xs={12} md={12}>
                  <DragAndDrop />
                </Col>
              </Row>
              <Row className="mt-4">
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
                    <Form.Text muted className="error-msg">{errors.name}</Form.Text>
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
                    <Form.Text muted className="error-msg">{errors.email}</Form.Text>
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
                    <Form.Text muted className="error-msg">{errors.schoolName}</Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Reward points</Form.Label>
                    <Form.Control
                      name="rewardPoint"
                      type="number"
                      placeholder="Reward Points"
                      value={rewardPoint}
                      onChange={handleChange}
                    />
                    <Form.Text muted className="error-msg">{errors.rewardPoint}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      name="location"
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={handleChange}
                    />
                    <Form.Text muted className="error-msg">{errors.location}</Form.Text>
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
    console.log("abcdefgh")
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
              <button className="nav-link active" id="nav-tabs-daily" data-bs-toggle="tab" data-bs-target="#tabs-1" type="button" role="tab" aria-controls="tabs-1" aria-selected="true">Daily update</button>
              <button className="nav-link" id="nav-tab-weekly" data-bs-toggle="tab" data-bs-target="#tabs-2" type="button" role="tab" aria-controls="tabs-2" aria-selected="false">Weekly </button>
              <button className="nav-link" id="nav-tab-monthly" data-bs-toggle="tab" data-bs-target="#tabs-3" type="button" role="tab" aria-controls="tabs-2" aria-selected="false">Monthly </button>
              <button className="add-btn ms-2" id="nav-tab-add" data-bs-toggle="tab" data-bs-target="#tabs-3" type="button" role="tab" aria-controls="tabs-2" aria-selected="false" onClick={() => handleModal(true, 'addNewMember')}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="tabs-1" role="tabpanel" aria-labelledby="tabs-tab1">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setSelectedId(data.id); setIsEdit(true); handleModal(true, 'addNewMember') }} />
              </div>
              <div className="tab-pane fade" id="tabs-2" role="tabpanel" aria-labelledby="tabs-2">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setSelectedId(data.id); setIsEdit(true); handleModal(true, 'addNewMember') }} />
              </div>
              <div className="tab-pane fade" id="tabs-3" role="tabpanel" aria-labelledby="tabs-3">
                <TabsData userData={userData} onOpenEditModal={(data) => { setValue({ ...values, ...data }); setSelectedId(data.id); setIsEdit(true); handleModal(true, 'addNewMember') }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {getModal()}
    </>
  );
};
