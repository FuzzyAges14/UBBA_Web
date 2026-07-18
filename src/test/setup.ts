import '@testing-library/jest-dom'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// jsdom does not implement matchMedia; provide a quiet default.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  })
}

// Quiet jsdom gaps used by hero video + route scroll manager.
if (typeof window !== 'undefined') {
  // jsdom may define scrollTo as a throwing stub — always replace it.
  window.scrollTo = () => undefined
  const mediaProto = window.HTMLMediaElement?.prototype as HTMLMediaElement & {
    __ubbaPlayStubbed?: boolean
  }
  if (mediaProto && !mediaProto.__ubbaPlayStubbed) {
    mediaProto.__ubbaPlayStubbed = true
    mediaProto.play = () => Promise.resolve()
    mediaProto.pause = () => undefined
  }
}
