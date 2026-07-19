import { useEffect } from 'react'

type JsonLdProps = {
  id: string
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Injects a single JSON-LD script into document head and removes it on unmount.
 * Keeps structured data scoped to the active route in this SPA.
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  const serialized = JSON.stringify(data)

  useEffect(() => {
    const scriptId = `jsonld-${id}`
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = serialized

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [id, serialized])

  return null
}
