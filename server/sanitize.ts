/** Strip C0/C1 control characters (including newlines) that break email headers. */
export function stripControlChars(value: string): string {
  // eslint-disable-next-line no-control-regex -- intentional control-char removal
  return value.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
}

/** Collapse whitespace and remove characters unsafe in email subject/header values. */
export function sanitizeHeaderValue(value: string): string {
  return stripControlChars(value)
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function clampLength(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max)
}
