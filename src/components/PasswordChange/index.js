import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { TextInput, Button, Pane, Alert } from 'evergreen-ui'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  isLoading: false,
  isComplete: false
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;
    this.setState({ isLoading: true })
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE, isComplete: true });
      })
      .catch(error => {
        this.setState({ ...INITIAL_STATE, error, isLoading: false });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { passwordOne, passwordTwo, error, isComplete } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    return (
      <form onSubmit={this.onSubmit}>
        <Pane display="flex" flexDirection="column" marginTop={10}>
          {error && (
            <Alert
              intent="danger"
              title={error.message}
              marginBottom={10}
            />
          )}
          {isComplete && (
            <Alert
              intent="success"
              title="The password was changed successfully"
              marginBottom={10}
            />
          )}
          <TextInput
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
            marginBottom={10}
            maxWidth="100%"
          />
          <TextInput
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
            marginBottom={10}
            maxWidth="100%"
          />
          <Button disabled={isInvalid} type="submit" width={160}>
            Change My Password
          </Button>
        </Pane>
      </form>
    );
  }
}
export default withFirebase(PasswordChangeForm);