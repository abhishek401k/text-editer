import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

import { login } from '../../../../actions/auth';

const Login = ({ login }) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <p onClick={toggle}>Login</p>
      <Modal isOpen={modal} className="text-center">
        <ModalHeader toggle={toggle} className="col-12 m-header">
          Login
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
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
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};


export default connect(null, { login })(Login);
