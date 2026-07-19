import { describe, expect, it } from 'vitest'
import {
  PROGRAM_AGE_RANGES,
  PROGRAM_DETAILS,
  PROGRAM_OPTIONS,
  childrenFreeClassHref,
  formatVisibleLocationList,
  resolveLocationOption,
  resolveProgramOption,
  SITE,
} from './site'

describe('program age ranges', () => {
  it('keeps core program ages centralized and consistent', () => {
    expect(PROGRAM_AGE_RANGES['tiny-tigers']).toBe('Ages 3-5')
    expect(PROGRAM_AGE_RANGES['junior-tigers']).toBe('Ages 6-10')
    expect(PROGRAM_AGE_RANGES['teen-martial-arts']).toBe('Ages 11-17')
    expect(PROGRAM_AGE_RANGES['adult-program']).toBe('Ages 18+')

    for (const slug of Object.keys(PROGRAM_AGE_RANGES) as Array<
      keyof typeof PROGRAM_AGE_RANGES
    >) {
      const detail = PROGRAM_DETAILS.find((p) => p.slug === slug)
      expect(detail?.ages).toBe(PROGRAM_AGE_RANGES[slug])
    }
  })

  it('includes age labels on core lead-form program options', () => {
    expect(PROGRAM_OPTIONS[0]).toContain(PROGRAM_AGE_RANGES['tiny-tigers'])
    expect(PROGRAM_OPTIONS[1]).toContain(PROGRAM_AGE_RANGES['junior-tigers'])
    expect(PROGRAM_OPTIONS[2]).toContain(PROGRAM_AGE_RANGES['teen-martial-arts'])
    expect(PROGRAM_OPTIONS[3]).toContain(PROGRAM_AGE_RANGES['adult-program'])
  })
})

describe('location + program resolvers', () => {
  it('formats visible locations with Glen Rock when enabled', () => {
    expect(SITE.showGlenRock).toBe(true)
    expect(formatVisibleLocationList({ style: 'and' })).toContain('Glen Rock')
    expect(formatVisibleLocationList({ style: 'and' })).toContain('Allendale')
    expect(formatVisibleLocationList({ style: 'and' })).toContain('Midland Park')
  })

  it('resolves program slugs and rejects invalid values', () => {
    expect(resolveProgramOption('tiny-tigers')).toBe('Tiny Tigers (Ages 3-5)')
    expect(resolveProgramOption('Teen Martial Arts (Ages 11-17)')).toBe(
      'Teen Martial Arts (Ages 11-17)',
    )
    expect(resolveProgramOption('nope')).toBeUndefined()
    expect(resolveProgramOption('')).toBeUndefined()
  })

  it('resolves location ids and builds free-class deep links', () => {
    expect(resolveLocationOption('glen-rock')).toBe('Glen Rock')
    expect(resolveLocationOption('Allendale')).toBe('Allendale')
    expect(resolveLocationOption('atlantis')).toBeUndefined()
    expect(childrenFreeClassHref({ program: 'tiny-tigers' })).toBe(
      '/programs/children?program=tiny-tigers#free-class',
    )
  })
})
