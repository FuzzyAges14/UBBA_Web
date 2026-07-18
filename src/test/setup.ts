import '@testing-library/jest-dom'

// jsdom does not implement scrollTo; Layout's ScrollManager calls it on navigate.
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})
