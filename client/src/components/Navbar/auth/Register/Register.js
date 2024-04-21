import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Register.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import { register } from '../../../../actions/auth';
import { setAlert } from '../../../../actions/alert';
import Alert from '../../../layout/Alert';

const Register = ({ register, setAlert }) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <p onClick={toggle}>Register</p>
      <Modal isOpen={modal} className="text-center">
        <ModalHeader toggle={toggle} className="col-12 m-header">
          Register
        </ModalHeader>
        <ModalBody>
          <Alert />
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                className="mb-3"
                onChange={e => onChange(e)}
              />
              <Input
                type="text"
                name="email"
                placeholder="Email"
                className="mb-3"
                onChange={e => onChange(e)}
              />
              <Input
                type="text"
                name="password"
                placeholder="Password"
                className="mb-3"
                onChange={e => onChange(e)}
              />
              <Input
                type="text"
                name="password2"
                placeholder="Confirm Password"
                className="mb-3"
                onChange={e => onChange(e)}
              />
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect(null, { register, setAlert })(Register);