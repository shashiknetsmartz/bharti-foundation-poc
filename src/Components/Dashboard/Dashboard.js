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
import './Dashboard.css'

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
    if(isEmpty(values)){
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
        return <CommonModal title={isEdit ? "Edit Info" : "Add New Member"} show={isOpen} onClose={() => {setValue(recordData); handleModal(false, '')}} onDone={() => handleSubmit()}>
          <Container>
            <Form>
              <Row>
                <Col xs={12} md={12}>
                  {/* <DragAndDrop /> */}
                  <input type="file" name="image" onChange={handleChangeImage} />
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
      <div className="container">
        <h3 className="text-center my-5">Leaderboard</h3>
        <Button className="my-2" onClick={() => handleModal(true, 'addNewMember')}>
          Add
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Profile Info</th>
              <th>Reward Points</th>
              <th>Edit Info</th>
            </tr>
          </thead>
          <tbody>
            {(userData && userData.length == 0) && <div>No Data Found</div>}
            {userData &&
              userData?.map((data) => (
                <tr key={data?.id}>
                  <td>{data.id}</td>
                  <td>
                    <div className="profile-info">
                      <div>
                        <img height="50" width="50" src={data.image} />
                      </div>
                      <div>
                        <div>{data.name}</div>
                        <div>{data.email}</div>
                        <div>{data.rewardPoint}</div>
                      </div>
                    </div>
                  </td>
                  <td>{data.rewardPoint}</td>
                  <td><EditFilled onClick={() => { setValue({ ...values, ...data }); setIsEdit(true); handleModal(true, 'addNewMember') }} /></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      {getModal()}
    </>
  );
};
