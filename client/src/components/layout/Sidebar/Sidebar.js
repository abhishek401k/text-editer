import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Sidebar.css';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Modal stuff below
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import { getUserNotes, setNote } from '../../../actions/note';
import { newNote } from '../../../actions/newNote';
import {
  createNotebook,
  getUserNotebooks,
  deleteNotebook,
  setNotebook,
} from '../../../actions/notebook';
import NBDropdown from '../NBDropdown/NBDropdown';

const Sidebar = ({
  getUserNotes,
  userNotes,
  userNotebooks,
  note,
  setNote,
  newNote,
  createNotebook,
  deleteNotebook,
  setNotebook,
  getUserNotebooks,
}) => {
  const [title, setTitle] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [notesList, setNotesList] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // Modal
  const [modal, setModal] = useState(false);
  const [NBModal, setNBModal] = useState(false);

  useEffect(() => {
    getUserNotes();
    getUserNotebooks();
    filteredNotes();
  }, [getUserNotes, getUserNotebooks, filterTerm]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleNBModal = () => {
    setNBModal(!NBModal);
  };

  const notebookTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const setNBAndDelete = (id) => {
    deleteNotebook(id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createNotebook({ title });
    setModal(!modal);
  };

  // Filter Term
  const filterNotes = (e) => {
    e.preventDefault();
    setFilterTerm(e.target.value);
    setDropdownOpen(true);
  };

  const filteredNotes = () => {
    if (userNotes.notes && userNotes.notes.length > 0) {
      const newArr = userNotes.notes.filter(function (el) {
        return el.title.includes(filterTerm);
      });
      setNotesList(newArr);
    }
  };

  if (userNotes.notes === null || userNotebooks.notebooks === null) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="sidebar-wrapper">
        <div className="menu">
          <div className="search">
            <span>
              <i className="fas fa-search"></i>
            </span>
            <input onChange={(e) => filterNotes(e)} />
          </div>
          <ul>
            <li className="new-note" onClick={newNote}>
              <i className="fas fa-plus-circle"></i>
              <p>New Note</p>
            </li>
            <li className="new-notebook" onClick={toggleModal}>
              <i className="fas fa-plus-circle"></i>
              <p>New Notebook</p>
            </li>
          </ul>
          <ul className="notes-ul">
            <Dropdown
              className="notes-dropdown"
              isOpen={dropdownOpen}
              toggle={toggle}
            >
              <DropdownToggle className="notes-dropdownToggle" caret>
                All Notes
              </DropdownToggle>
              <DropdownMenu className="drop-menu">
                {
                  // Noteslist is the resulting array of those notes matching the search... If there is no matching, we just print 'all notes'
                  notesList !== null
                    ? notesList.map((note) => (
                      <DropdownItem
                        onClick={() => setNote(note)}
                        key={note._id}
                        className="drop-item"
                      >
                        {note.title}
                      </DropdownItem>
                    ))
                    : userNotes.notes.map((note) => (
                      <DropdownItem
                        onClick={() => setNote(note)}
                        key={note._id}
                        className="drop-item"
                      >
                        {note.title}
                      </DropdownItem>
                    ))
                }
              </DropdownMenu>
            </Dropdown>
          </ul>
          <ul className="notebooks-ul">
            <i className="fas fa-ellipsis-v" onClick={toggleNBModal}></i>
            {userNotebooks.notebooks.map((notebook) => (
              <NBDropdown
                key={notebook._id}
                title={notebook.title}
                entries={notebook.entries}
              />
            ))}
          </ul>
        </div>
        <Modal isOpen={modal} className="text-center">
          <ModalHeader toggle={toggleModal} className="col-12 ">
            Enter a Notebook Title
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => onSubmit(e)}>
              <FormGroup>
                <Input
                  type="text"
                  name="notebook-title"
                  placeholder="title..."
                  className="mb-3"
                  onChange={(e) => notebookTitleChange(e)}
                />
                <Button>Create Notebook</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={NBModal}>
          <ModalHeader toggle={toggleNBModal}>Delete a Notebook</ModalHeader>
          <ModalBody>
            {userNotebooks.notebooks.map((notebook) => (
              <p
                className="del-option"
                key={notebook._id}
                onClick={() => setNBAndDelete(notebook._id)}
              >
                <i className="far fa-trash-alt"></i>
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
  userNotes: state.userNotes,
  note: state.note,
  userNotebooks: state.userNotebooks,
});

export default connect(mapStateToProps, {
  getUserNotes,
  setNote,
  newNote,
  createNotebook,
  deleteNotebook,
  setNotebook,
  getUserNotebooks,
})(Sidebar);
