import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const getLocalData = () => {
    return JSON.parse(localStorage.getItem("Pat")) || [];
}

const Patient = () => {
    const initialState = {
        id: "",
        fullname: "",
        age: "",
        regdate: "",
        bloodgroup: "",
        email: "",
        contactno: "",
        DOB: "",
        gender: "",
        address: "",
        reason: "",
        insurancename: "",
        insuranceid: "",
        policyname: "",
        doctorname: "",
        doctornumber: "",
        healthnumber: ""
    }

    const [inputForm, setInputForm] = useState(initialState);
    const [isEdit, setIsEdit] = useState(false);
    const [storage, setStorage] = useState(getLocalData());

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name] : value
        })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            let updateData = storage.map((pat) => {
                if (pat.id == inputForm.id) {
                    return inputForm
                } else {
                    return pat;
                }
            });
            setStorage(updateData);
            setIsEdit(false)
        } else {
            let id = Math.floor(Math.random() * 1000)
            setStorage([...storage, {...inputForm, id}])
        }
        setInputForm(initialState);
    }

    const handelDelete = (id) => {
        let updateData = storage.filter((pat) => pat.id != id)
        setStorage(updateData)
    }

    const handelEdit = (id) => {
        let pat = storage.find((pat) => pat.id == id)
        setInputForm(pat);
        setIsEdit(true);
    }

    useEffect(() => {
        localStorage.setItem("Pat", JSON.stringify(storage));
    }, [storage]);

    return(
        <>
            <Row>
                <Col>
                    <h2 className="text-center fw-bold my-4">{isEdit ? "Edit" : "New"} Patient form</h2>
                    <Form onSubmit={handelSubmit}>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Fullname:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="fullname" value={inputForm.fullname} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                Age:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" name="age" value={inputForm.age} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Registration Date:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="date" name="regdate" value={inputForm.regdate} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                Blood Group
                            </Form.Label>
                            <Col sm="4">
                                <Form.Select aria-label="Default select example" name="bloodgroup" value={inputForm.bloodgroup} onChange={handelChanged} >
                                    <option>Blood Group</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Email:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="email" value={inputForm.email} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                ContactNo:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" name="contactno" value={inputForm.contactno} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                DOB:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="date" name="DOB" value={inputForm.DOB} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                Gender:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Check type="radio" label={"Male"} name="gender" value={"Male"} onChange={handelChanged} />
                            </Col>
                            <Col sm="2">
                                <Form.Check type="radio" label={"Female"} name="gender" value={"Female"} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Address:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="address" value={inputForm.address} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="3">
                                Reason for Registration:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="reason" value={inputForm.reason} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Insurance Company:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="insurancename" value={inputForm.insurancename} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                Insurance ID:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="insuranceid" value={inputForm.insuranceid} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Policy Holder's Name:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="policyname" value={inputForm.policyname} onChange={handelChanged} />
                            </Col>
                            <Form.Label column sm="2">
                                Family Doctor name:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="text" name="doctorname" value={inputForm.doctorname} onChange={handelChanged} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="2">
                                Family Doctor Phone Number:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" name="doctornumber" value={inputForm.doctornumber} onChange={handelChanged} />
                            </Col>
                            
                            <Form.Label column sm="2">
                                Health Care Number:
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control type="number" name="healthnumber" value={inputForm.healthnumber} onChange={handelChanged} />
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="5">
                            </Form.Label>
                            <Col sm="5">
                                <Button type="submit">Submit Form</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>

                <h2 className="text-center fw-bold my-4">View Patient details</h2>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Insurance ID</th>
                            <th>Full Name</th>
                            <th>Reason</th>
                            <th>Email</th>
                            <th>ContactNo</th>
                            <th>Doctor Name</th>
                            <th>Blood Group</th>
                            <th>Registration Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storage.map((pat) => (
                                <tr>
                                    <td>{pat.id}</td>
                                    <td>{pat.insuranceid}</td>
                                    <td>{pat.fullname}</td>
                                    <td>{pat.reason}</td>
                                    <td>{pat.email}</td>
                                    <td>{pat.contactno}</td>
                                    <td>{pat.doctorname}</td>
                                    <td>{pat.bloodgroup}</td>
                                    <td>{pat.regdate}</td>
                                    <td>
                                        <Button onClick={() => handelEdit(pat.id)}>
                                            <FaEdit />
                                        </Button> ||
                                        <Button onClick={() => handelDelete(pat.id)} variant="danger">
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </Row>
        </>
    )
}

export default Patient;