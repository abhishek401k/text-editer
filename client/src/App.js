import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Components
import Navbar from './components/Navbar/Navbar';
import Banner from './components/layout/Banner/Banner';
import SubBanner from './components/layout/SubBanner/SubBanner';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='app-wrapper'>
          <Navbar />
          <Route exact path='/' component={Banner} />
          <Route exact path='/' component={SubBanner} />
          <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;