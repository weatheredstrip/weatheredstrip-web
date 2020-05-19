import React, { Component, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { TextInput, Dialog, Button, Spinner } from 'evergreen-ui'

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
  isLoading: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
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

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <LoadingContext.Provider value={{ isLoading: this.state.isLoading }}>
        <Dialog
          isShown
          title="Sign Up"
          onCloseComplete={() => {this.props.history.push(ROUTES.LANDING);}}
          footer={ <SignUpFooter isInvalid={isInvalid} onSubmit={this.onSubmit}/> }
        >
          <form onSubmit={this.onSubmit}>
            <TextInput
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
            />
            <TextInput
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <TextInput
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <TextInput
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            {error && <p className="login-form-error">{error.message}</p>}
          </form>
        </Dialog>
      </LoadingContext.Provider>
    );
  }
}
const SignUpLink = () => (
  <p className="login-form-note">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };