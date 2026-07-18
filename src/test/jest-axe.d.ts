import type { AxeResults } from 'axe-core'

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void
  }
}

declare module 'jest-axe' {
  import type { AxeResults as Results, RunOptions, Spec } from 'axe-core'

  export interface JestAxeConfigureOptions extends Spec {
    globalOptions?: RunOptions
    impactLevels?: Array<'minor' | 'moderate' | 'serious' | 'critical'>
  }

  export type JestAxe = (
    html: Element | string,
    options?: RunOptions,
  ) => Promise<Results>

  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe
  export const axe: JestAxe
  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): {
      message: () => string
      pass: boolean
    }
  }
}
