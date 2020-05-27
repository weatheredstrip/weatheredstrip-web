import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { 
  BrowserRouter as Router
} from 'react-router-dom'
import Landing from '../index'
import '@testing-library/jest-dom/extend-expect'
afterEach(cleanup)

it('landing renders properly', () => {
  const { container } = render(<Router><Landing /></Router>)
  const landing = container.firstChild
  expect(landing).toMatchSnapshot()
})
