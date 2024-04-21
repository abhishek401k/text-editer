import React, { useState } from 'react';
import { connect } from 'react-redux';
import './OrgModal.css';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import { organizeNote } from '../../../actions/note';

const OrgModal = ({ userNotebooks, note, organizeNote }) => {
  // Modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleOrg = (notebook, note) => {
    organizeNote(note.id, notebook._id);
    toggleModal();
  };

  if (userNotebooks.notebooks === null) {
    return <p>loading...</p>;
  } else {
    return (
      <div>
        <button onClick={toggleModal}>Organize</button>
        <Modal isOpen={modal}>
          <ModalHeader toggle={toggleModal}>Move Note to...</ModalHeader>
          <ModalBody>
            {userNotebooks.notebooks.map((notebook) => (
              <p
                className="notebook-title"
                onClick={() => handleOrg(notebook, note)}
                key={notebook._id}
              >
                <i className="fas fa-book"></i>
                {notebook.title}
              </p>
            ))}
          </ModalBody>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  note: state.note,
  userNotebooks: state.userNotebooks,
});

export default connect(mapStateToProps, { organizeNote })(OrgModal);
