import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Banner.css';

import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import { register } from '../../../actions/auth';
import { setAlert } from '../../../actions/alert';
import Alert from '../Alert';

const Banner = ({ isAuthenticated, register, setAlert }) => {
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

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="banner">
      <div className='slugline'>
        <h1>A Simple Notepad Application</h1>
        <h4>Take notes, organize thoughts, create lists, write your story</h4>
        <button onClick={toggle}>Sign Up</button>
      </div>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Banner);
