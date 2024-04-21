import React, { useState } from 'react';
import { connect } from 'react-redux';

import './NBDropdown.css';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { setNote } from '../../../actions/note';

const NBDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      className="notebooks-dropdown"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret className="notebooks-dropdownToggle">
        <span className="nb-title">{props.title}</span>
      </DropdownToggle>
      <DropdownMenu>
        {props.entries.map((entry) => (
          <DropdownItem onClick={() => props.setNote(entry)} key={entry._id}>
            {entry.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default connect(null, { setNote })(NBDropdown);
