import React from 'react';
import './Dashboard.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Sidebar from '../layout/Sidebar/Sidebar';
import EditorComponent from '../EditorComponent/EditorComponent';

const Dashboard = ({ isAuthenticated }) => {

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='dashboard-wrapper'>
      <div className='sidebar-wrapper'>
        <Sidebar />
      </div>
      <div className='editor'>
        <EditorComponent />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);