import React from 'react'
import { withRouter } from 'react-router'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { Alert, Button, Dialog } from 'evergreen-ui'

const needsEmailVerification = authUser => (
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password')
)

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isSent: false, isLoading: false, error: '' }
    }

    onSendEmailVerification = () => {
      this.setState({ isLoading: true })
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true, isLoading: false }))
        .catch((error) => {
          this.setState({ error, isLoading: false });
        })
    }

    renderFooter = () => (
      <>
        <Button
          onClick={() => this.props.history.goBack()}
          marginRight={20}
        >
          Back
        </Button>
        <Button
          onClick={this.onSendEmailVerification}
          appearance="primary"
          disabled={this.state.isSent}
          isLoading={this.state.isLoading}
        >
          Resend Email
        </Button>
      </>
    )
      

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            needsEmailVerification(authUser) ? (
              <Dialog
                title="Email verification required"
                isShown={true}
                footer={this.renderFooter}
                hasClose={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEscapePress={false}
              >
                {this.state.error ? (
                  <Alert
                    title={this.state.error.message}
                    intent="danger"
                  />
                ) : this.state.isSent ? (
                  <Alert
                    title="Email confirmation sent!"
                    intent="success"
                  >
                    Check your emails (spam folder included) for a confirmation email.
                  </Alert>
                ) : (
                  <Alert
                    title="Your email needs to be verified..."
                    intent="warning"
                  >
                    Check your emails (spam folder included) for a confirmation email or send another confirmation email.
                  </Alert>
                )}
              </Dialog>
            ) : (
              <Component { ...this.props } />
            )
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  return withRouter(withFirebase(WithEmailVerification))
}

export default withEmailVerification
