import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { TextInput, Heading, Button, Spinner, Pane, Text, Checkbox, Link, Card } from 'evergreen-ui'

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div className="landing-page">
    <SignUpForm />
  </div>
);

const LoadingContext = React.createContext({ isLoading: false });

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  readBoth: false,
  isLoading: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { firstName, lastName, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstName,
            lastName,
            email,
          });
      })
      .then(() => {
        /* Add firstName as Display Name to firebase authentication
         * this will be used by authentication templates */
        return this.props.firebase.doAddProfileName(firstName)
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification()
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCheck = () => {
    this.setState({ readBoth: !this.state.readBoth })
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      error,
      readBoth,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      !readBoth;

    return (
      <LoadingContext.Provider value={{ isLoading: this.state.isLoading }}>
        <Card
          width={560}
          background="tint1"
          elevation={2}
        >
          <Pane
            padding={16}
            borderBottom
          >
            <Heading size={500} fontSize={20}>Sign Up</Heading>
          </Pane>
          <form onSubmit={this.onSubmit}>
            <Pane
              padding={16}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Text >
                Accounts will provide the ability to add presets in the future.
              </Text>
              <Text marginBottom={20}>
                Option for feature update emails will also be provided.
              </Text>
              <TextInput
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                type="text"
                placeholder="First Name"
                marginBottom={10}
              />
              <TextInput
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                type="text"
                placeholder="Last Name"
                marginBottom={10}
              />
              <TextInput
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                marginBottom={10}
              />
              <TextInput
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                marginBottom={10}
              />
              <TextInput
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                marginBottom={10}
              />
              <Pane
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Checkbox
                  marginRight={20} 
                  name="readBoth"
                  checked={readBoth}
                  onChange={this.onCheck}
                  label={
                  <Text>
                      I have read the <Link is={RouterLink} to={ROUTES.TERMS_OF_SERVICE} color="dark">Terms of Service</Link> and <Link is={RouterLink} to={ROUTES.PRIVACY_POLICY} color="dark">Privacy Policy</Link>
                  </Text>
                }/>
              </Pane>
              {error && <p className="login-form-error">{error.message}</p>}
            </Pane>
            <Pane
              display="flex"
              padding={16}
              borderTop
              justifyContent="flex-end"
            >
              <Button
              marginRight={20}
              onClick={() => this.props.history.goBack()}
              >Back</Button>
              <Button
                appearance="primary"
                disabled={isInvalid || this.state.isLoading}
                className="login-form-button"
                type="submit"
                onClick={this.onSubmit}
              >
                {this.state.isLoading ? <Spinner size={12} /> : null}
                {this.state.isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </Pane>
          </form>
        </Card>
      </LoadingContext.Provider>
    );
  }
}
const SignUpLink = () => (
    <Text>Don't have an account? <Link is={RouterLink} to={ROUTES.SIGN_UP}>Sign Up</Link></Text>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };