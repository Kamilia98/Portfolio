import { render, screen } from '@testing-library/react'
import App from '../src/App'

test('renders the name as the only h1', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kamilia Ahmed')
})
