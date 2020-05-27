import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Alert, Pane, TextInput, Button, Link, Card, Heading } from 'evergreen-ui'

import * as ROUTES from '../../constants/routes';

const PasswordForgetPageBase = (props) => (
  <div className="landing-page">
    <PasswordForgetForm/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  isSent: false,
  isLoading: false,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.setState({ isLoading: true })

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, isSent: true });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, isSent, isLoading } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <Card
          maxWidth="calc(100vw - 16px * 2)"
          width={560}
          background="tint1"
          elevation={2}
        >
          <Pane
            padding={16}
            borderBottom
          >
            <Heading size={500} fontSize={20}>Password Reset</Heading>
          </Pane>
          <Pane
            padding={16}
            display="flex"
            flexDirection="column"
          >
            {error && (
              <Alert
                intent="danger"
                title={error.message}
                marginBottom={10}
              />
            )}
            {isSent && (
              <Alert
                intent="success"
                title="Password reset e-mail has been sent!"
                marginBottom={10}
              />
            )}
            <TextInput
              disabled={isSent}
              name="email"
              maxWidth="100%"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            
          </Pane>
          <Pane
            display="flex"
            padding={16}
            borderTop
            justifyContent="flex-end"
          >
            <Button
              type="button"
              intent={isSent && "success"}
              appearance={isSent && "primary"}
              marginRight={!isSent && 20}
              onClick={() => this.props.history.goBack()}
            >
              Back
            </Button>
            {!isSent && (
              <Button
                disabled={isInvalid}
                type="submit"
                appearance="primary"
                isLoading={isLoading}
              >
                {isLoading ? "Loading..." : "Reset My Password"}
              </Button>
            )}
          </Pane>
        </Card>
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <Link is={RouterLink} to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

const PasswordForgetPage = withRouter(PasswordForgetPageBase)
const PasswordForgetForm = withFirebase(withRouter(PasswordForgetFormBase));

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };