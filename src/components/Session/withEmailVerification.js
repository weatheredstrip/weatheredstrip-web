import React from 'react'
import { withRouter } from 'react-router'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase'
import { Paragraph, Button, Dialog } from 'evergreen-ui'

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
      
      this.state = { isSent: false }
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
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
        >
          Send confirmation E-Mail
        </Button>
      </>
    )
      

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            needsEmailVerification(authUser) ? (
              <Dialog
                title="E-Mail verification required"
                isShown={true}
                footer={this.renderFooter}
                hasClose={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEscapePress={false}
              >
                {this.state.isSent ? (
                  <Paragraph>
                    E-Mail confirmation sent: Check your E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.
                  </Paragraph>
                ) : (
                  <Paragraph>
                    Your E-Mail needs to be verified: Check your E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.
                  </Paragraph>
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
