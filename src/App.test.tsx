import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the UBBA hero title', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /ubba/i })).toBeInTheDocument()
  })

  it('unwraps the present when the gift is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByText(/tap the gift to unwrap it/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /open the present/i }))

    expect(screen.getByText(/surprise/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /close the present/i }),
    ).toBeInTheDocument()
  })
})
