import React from 'react'
import { Pane, Text, Card, Button, Heading } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'

import * as ROUTES from '../../constants/routes';

const NoMatchPage = (props) => (
  <div className="landing-page">
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
        <Heading size={500} fontSize={20}>Uh oh...</Heading>
      </Pane>
      <Pane
        padding={16}
        display="flex"
        alignItems="left"
        flexDirection="column"
      >
        <Text size={500}>
          The page you are looking for does not exist...
        </Text>
        <Text size={500}>
          If it existed before, it might have been moved or deleted through an update.
        </Text>
      </Pane>
      <Pane
        display="flex"
        padding={16}
        borderTop
        justifyContent="flex-end"
      >
        <Button
          appearance="primary"
          onClick={() => props.history.push(ROUTES.LANDING)}
        >
          Home
        </Button>
      </Pane>
    </Card>
  </div>
);

export default withRouter(NoMatchPage)