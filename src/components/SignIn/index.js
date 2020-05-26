import React, { Component, useState, useContext } from 'react';
import { Alert, Dialog, Button, Pane, TextInput, Spinner, Menu } from 'evergreen-ui'

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';

import './SignIn.css'

const SignInMenu = () => {
  const [showSignIn, setShown] = useState(false)
  return (
    <>
      <SignInDialog isShown={showSignIn} onClose={() => setShown(false)}/>
      <Menu.Item icon="log-in" 
        onSelect={() => {
          setShown(true)
        }}
      >
        Sign In
      </Menu.Item>
    </>
  )
}

const LoadingContext = React.createContext({ isLoading: false });



const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  isLoading: false,
};

class SignInDialogBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({isLoading: true})
    try {
      await this.props.firebase.doSignInWithEmailAndPassword(email, password)
      this.props.onClose()
      this.setState({ ...INITIAL_STATE });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signInFooter = ({ isInvalid }) => {
    const { isLoading } = this.state
    return (
      <Button
        appearance="primary"
        disabled={isInvalid || isLoading}
        type="submit"
        form="signInForm"
        onClick={this.onSubmit}
        isLoading={isLoading}
      >
        {isLoading ? "Loading..." : "Sign In"}
      </Button>
    )
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <LoadingContext.Provider value={{ isLoading: this.state.isLoading }}>
        <Dialog
          title="Sign In"
          isShown={this.props.isShown}
          onCloseComplete={() => {
            this.props.onClose()
            this.setState({ ...INITIAL_STATE })
          }}
          footer={ this.signInFooter({isInvalid: isInvalid}) }
        >
          <form onSubmit={this.onSubmit} id="signInForm">
            <Pane
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {error && (
                <Alert
                  intent="danger"
                  title={error.message}
                  marginBottom={10}
                />
              )}
              <TextInput
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                marginBottom={10}
              />
              <TextInput
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                marginBottom={10}
              />    
              <PasswordForgetLink />
              <SignUpLink />
            </Pane>
          </form>
        </Dialog>
      </LoadingContext.Provider>
    );
  }
}

const SignInDialog = withFirebase(SignInDialogBase);

export default SignInMenu;
export { SignInDialog };