import React from 'react'
import { Pane, Text, Card, Button, Heading } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { 
  AuthUserContext, 
  withAuthorization, 
  withEmailVerification 
} from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPageBase = (props) => (
  <div className="landing-page">
    <AccountDialog history={props.history}/>
  </div>
);

const AccountDialog = (props) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Card
        width={560}
        background="tint1"
        elevation={2}
      >
        <Pane
          padding={16}
          borderBottom
        >
          <Heading size={500} fontSize={20}>Account</Heading>
        </Pane>
        <Pane
          padding={16}
          display="flex"
          alignItems="left"
          flexDirection="column"
        >
          <Text size={500}>{authUser.email}</Text>
          <PasswordChangeForm />
        </Pane>
        <Pane
          display="flex"
          padding={16}
          borderTop
          justifyContent="flex-end"
        >
          <Button onClick={()=> props.history.goBack()}>Back</Button>
        </Pane>
      </Card>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;
const AccountPage = withRouter(AccountPageBase)

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);