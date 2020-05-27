import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { shallow } from 'enzyme'
import SearchBox, {SearchBoxBase} from '../searchbox.react'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router-dom'

it('searchbox renders properly', () => {
  const history = createMemoryHistory()
  const { container } = render(<Router history={history}><SearchBox /></Router>)
  const searchbox = container.firstChild
  expect(searchbox).toMatchSnapshot()
})

it('searchbox data entry changes state', () => {
  const history = createMemoryHistory()
  const { getByLabelText } = render(<Router history={history}><SearchBox /></Router>)

  const input = getByLabelText("search-input")
  userEvent.type(input, 'CYOD')
  expect(getByLabelText("search-input")).toHaveAttribute('value', 'CYOD')

  userEvent.type(input, ' CYUL')

  expect(getByLabelText("search-input")).toHaveAttribute('value', 'CYOD CYUL')
})

it('enables the button when data is entered', () => {
  const history = createMemoryHistory()
  const { getByLabelText } = render(<Router history={history}><SearchBox /></Router>)

  const input = getByLabelText("search-input")
  userEvent.type(input, 'CYOD')
  expect(getByLabelText("search-button")).not.toHaveAttribute('disabled')
})

// Need function testing for form submit.
