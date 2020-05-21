import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Dialog, Pane, TextInput, Button, Link } from 'evergreen-ui'

import * as ROUTES from '../../constants/routes';

const PasswordForgetPageBase = (props) => (
  <div className="landing-page">
    <Dialog
      isShown={true}
      hasHeader={false}
      onCloseComplete={() => { props.history.goBack() }}
      hasCancel={false}
      confirmLabel="Back"
    >
      <div className="subtitle">Password Reset</div>
      <PasswordForgetForm />
    </Dialog>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <Pane display="flex" flexDirection="column">
          <TextInput
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Button
            disabled={isInvalid}
            type="submit"
          >
            Reset My Password
          </Button>
          {error && <p className="login-form-error">{error.message}</p>}
        </Pane>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <Link is={RouterLink} to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

const PasswordForgetPage = withRouter(PasswordForgetPageBase)

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };