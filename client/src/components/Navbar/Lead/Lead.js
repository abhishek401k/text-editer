import React from 'react';

import './Lead.css';

const Item = props => {
  return (
    <div className='top-menu-lead'>
      {props.text}
    </div>
  );
};

export default Item;