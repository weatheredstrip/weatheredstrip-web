import React, { useState } from 'react'
import { Popover, Menu, Text, Button } from 'evergreen-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import './issues.css'

const Issues = props => {
  const { position, top, right, bottom, left } = props
  const [issues, setIssues] = useState(null)

  if (issues === null) {
    fetch('https://us-central1-weatheredstrip.cloudfunctions.net/queryIssues')
      .then(response => {
        return response.json()
      })
      .then(result => setIssues(result))
      .catch(error => console.log('error', error))
  }

  return (
    <>
      {issues && issues.length >= 1 && (
        <Popover
          className="issues-popover"
          content={
            <Menu
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Text className="issues-title">Service Issues</Text>
              <Menu.Divider />
              <Menu.Group>
                {issues.map(issue => (
                  <Menu.Item
                    key={issue.title}
                    onSelect={() => window.open(issue.html_url, '_blank')}
                  >
                    {issue.title}
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          }
        >
          <Button
            appearance="primary"
            intent="warning"
            iconBefore="caret-down"
            position={position}
            right={right}
            top={top}
            left={left}
            bottom={bottom}
          >
            <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
          </Button>
        </Popover>
      )}
    </>
  )
}

export default Issues
