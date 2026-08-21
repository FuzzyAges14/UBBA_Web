/* eslint-disable react-refresh/only-export-components -- context + hook live together */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import NextKickFormPortal from '../components/NextKickFormPortal'

type TrialPortalContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const TrialPortalContext = createContext<TrialPortalContextValue | null>(null)

export function TrialPortalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => {
    const active = document.activeElement
    openerRef.current = active instanceof HTMLElement ? active : null
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    queueMicrotask(() => openerRef.current?.focus())
  }, [])

  const value = useMemo(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  )

  return (
    <TrialPortalContext.Provider value={value}>
      {children}
      <NextKickFormPortal open={isOpen} onClose={close} />
    </TrialPortalContext.Provider>
  )
}

export function useTrialPortal(): TrialPortalContextValue | null {
  return useContext(TrialPortalContext)
}
