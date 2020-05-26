import React from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import './App.css'

import { withAuthentication } from '../Session';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import RequestPage from '../Request';
import { PrivacyPolicy, ToS } from '../Policies';
import NoMatchPage from '../NoMatchPage'

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div className="app">
      <Switch>
        <Route exact path={ROUTES.LANDING} exact component={LandingPage} />
        <Route path={ROUTES.REQUEST} component={RequestPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Route exact path={ROUTES.TERMS_OF_SERVICE} component={ToS} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  </Router>
)

export default withAuthentication(App)
