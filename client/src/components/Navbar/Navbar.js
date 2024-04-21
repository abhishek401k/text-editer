import React, { useState, Fragment } from 'react';
import './Navbar.css';
import { connect } from 'react-redux';
// @ts-ignore
import logo from '../../img/take-note-logo.jpg';
// @ts-ignore
import authLogo from '../../img/take-note-logo-auth.jpg';

// Components
import Register from './auth/Register/Register';
import Login from './auth/Login/Login';
import Lead from './Lead/Lead';

// Actions
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, loading, logout }) => {
  const [menu_class, set_menu_class] = useState('');
  const setToggleNavbarClass = () => {
    if (menu_class === '') {
      set_menu_class('toggled');
    } else {
      set_menu_class('');
    }
  };

  let top_menu_class = `top-menu ${menu_class}`;

  const userLinks = (
    <div style={{ color: '#000' }} className="right" onClick={logout}>
      <p>Logout</p>
    </div>
  );

  const guestLinks = (
    <div className="right">
      <Register />
      <Login />
    </div>
  );

  const authStyle = {
    backgroundColor: '#fca311',
  };

  return (
    <div style={isAuthenticated ? authStyle : null}>
      <div className={top_menu_class}>
        {!loading && isAuthenticated ? (
          <img src={authLogo} className="site-logo" alt="site-logo" />
        ) : (
            <img src={logo} className="site-logo" alt="site-logo" />
          )}
        <Lead text="Take Note" />
        {!loading && (
          <Fragment>{isAuthenticated ? userLinks : guestLinks}</Fragment>
        )}
        <i
          className="fas fa-bars top-menu-icon"
          onClick={setToggleNavbarClass}
        ></i>
        <div className="clear-fix" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
