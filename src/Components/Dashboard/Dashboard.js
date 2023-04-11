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

const recordData = {
  name: '',
  email: '',
  schoolName: '',
  rewardPoint: '',
  image: ''
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState('')
  const [isOpen, setIsOpen] = useState(false)
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

  const getRecordData = () => {
    dispatch(actions.getUser(() => { setIsLoading(false) }));
  }

  useEffect(() => {
    setIsLoading(true)
    getRecordData();
    return () => { };
  }, []);

  const toBase64 = file => new Promise((resolve, reject) => {
    console.log('file', file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async () => {
    setIsLoading(true)
    if(isEdit){
      dispatch(actions.updateRecord(values, () => { 
        setIsLoading(false); 
        getRecordData();
        setValue(recordData);
        handleModal(false, '')
      }));  
      return;
    }
    dispatch(actions.postRecord(values, () => { 
      setIsLoading(false); 
      getRecordData();
      setValue(recordData);
      handleModal(false, '')
    }));
  }

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
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setValue({ ...values, [name]: value })
  }
  const getModal = () => {
    switch (modalType) {
      case 'addNewMember':
        return <CommonModal title={isEdit ? "Edit Info" : "Add New Member"} show={isOpen} onClose={() => handleModal(false, '')} onDone={() => handleSubmit()}>
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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
                      autoFocus
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

  console.log('values', values)

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
            {userData &&
              userData?.map((data) => (
                <tr key={data?.id}>
                  <td><img height="20" width="20" src={data.image} /></td>
                  <td>{data.name}</td>
                  <td>{data.rewardPoint}</td>
                  <td><EditFilled onClick={() => { setValue({ ...values, ...data }); setIsEdit(true); handleModal(true, 'addNewMember') }} /></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {getModal()}
    </>
  );
};
