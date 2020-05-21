import React from 'react'
import { Dialog, Text } from 'evergreen-ui'
import { withRouter } from 'react-router'
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPageBase = (props) => (
  <div className="landing-page">
    <AccountDialog history={props.history}/>
  </div>
);

const AccountDialog = (props) => (
  <AuthUserContext.Consumer>
    {authUser => (
        <Dialog
          title="Account"
          isShown={true}
          hasClose={false}
          hasCancel={false}
          confirmLabel="Back"
          onCloseComplete={() => { props.history.goBack() }}
        >
          <Text size={500}>{authUser.email}</Text>
          <PasswordChangeForm />
        </Dialog>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;
const AccountPage = withRouter(AccountPageBase)

export default withAuthorization(condition)(AccountPage);