import React from 'react'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import { 
  BrowserRouter as Router
} from 'react-router-dom'
import Landing from '../index'
import '@testing-library/jest-dom/extend-expect'
afterEach(cleanup)

it('landing renders properly', () => {
  const { container } = render(<Router><Landing /></Router>)

  expect(container).toMatchSnapshot()
})

it('has navigation button', () => {
  const { container } = render(<Router><Landing/></Router>)
  const landing = container.firstChild
  expect(landing.firstChild.nodeName).toEqual("BUTTON")
})

it('opens navigation when button is clicked', () => {
  const { container } = render(<Router><Landing /></Router>)

  const landing = container.firstChild

  const button = landing.firstChild

  fireEvent(
    button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: false,
    })
  )

  const menu = screen.getByRole("menu");
  expect(menu).not.toBeNull();
})