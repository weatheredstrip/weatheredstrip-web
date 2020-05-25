import React, { Component, useContext } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { TextInput, Dialog, Button, Spinner, Pane, Text, Checkbox, Link } from 'evergreen-ui'

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div className="landing-page">
    <SignUpForm />
  </div>
);

const LoadingContext = React.createContext({ isLoading: false });

const SignUpFooter = ({ isInvalid, onSubmit }) => {
  const { isLoading } = useContext(LoadingContext)
  const text = isLoading ? "Loading..." : "Sign Up"
  return(
    <Button
      appearance="primary"
      disabled={isInvalid || isLoading}
      className="login-form-button"
      type="submit" 
      form="signInForm"
      onClick={onSubmit}
    >
      {isLoading ? <Spinner size={12}/> : null}
      {text}
    </Button>
  )
}

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
        // Add correct Display Name to firebase
        return this.props.firebase.doAddProfileName(firstName)
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
        <Dialog
          isShown
          title="Sign Up"
          asClose={false}
          onCloseComplete={() => {this.props.history.push(ROUTES.LANDING);}}
          footer={ <SignUpFooter isInvalid={isInvalid} onSubmit={this.onSubmit}/> }
        >
          <form onSubmit={this.onSubmit}>
            <Pane
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Text >
                Accounts will provide ability to add presets in the future.
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
                    I have read the <Link href="#" color="dark">Terms of Service</Link> and <Link href="#" color="dark">Privacy Policy</Link>
                  </Text>
                }/>
              </Pane>
              {error && <p className="login-form-error">{error.message}</p>}
            </Pane>
          </form>
        </Dialog>
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