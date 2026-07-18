import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

export function renderWithRouter(
  ui: ReactElement,
  {
    route = '/',
    ...options
  }: RenderOptions & { route?: string } = {},
) {
  return render(ui, {
    wrapper: ({ children }: { children?: ReactNode }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
    ...options,
  })
}

/** Full app shell at a given path (includes Layout, Header, Seo). */
export function renderAppAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}
