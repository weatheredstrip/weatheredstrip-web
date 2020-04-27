import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import './App.css'

import { withAuthentication } from '../Session';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import RequestPage from '../Request';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div className="app">
      <Route path={ROUTES.LANDING} exact component={LandingPage} />
      <Route path={ROUTES.REQUEST} component={RequestPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
)

export default withAuthentication(App)
