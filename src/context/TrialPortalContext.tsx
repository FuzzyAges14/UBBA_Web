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
import type { NextKickFormKind, NextKickLocationId } from '../data/contact'

type TrialPortalContextValue = {
  isOpen: boolean
  kind: NextKickFormKind | null
  locationId: NextKickLocationId | null
  open: (kind: NextKickFormKind) => void
  close: () => void
  selectLocation: (id: NextKickLocationId) => void
  backToPicker: () => void
}

const TrialPortalContext = createContext<TrialPortalContextValue | null>(null)

export function TrialPortalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [kind, setKind] = useState<NextKickFormKind | null>(null)
  const [locationId, setLocationId] = useState<NextKickLocationId | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((nextKind: NextKickFormKind) => {
    const active = document.activeElement
    openerRef.current = active instanceof HTMLElement ? active : null
    setKind(nextKind)
    setLocationId(null)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setKind(null)
    setLocationId(null)
    queueMicrotask(() => openerRef.current?.focus())
  }, [])

  const selectLocation = useCallback((id: NextKickLocationId) => {
    setLocationId(id)
  }, [])

  const backToPicker = useCallback(() => {
    setLocationId(null)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      kind,
      locationId,
      open,
      close,
      selectLocation,
      backToPicker,
    }),
    [isOpen, kind, locationId, open, close, selectLocation, backToPicker],
  )

  return (
    <TrialPortalContext.Provider value={value}>
      {children}
      <NextKickFormPortal
        open={isOpen}
        onClose={close}
        kind={kind}
        locationId={locationId}
        onSelectLocation={selectLocation}
        onBackToPicker={backToPicker}
      />
    </TrialPortalContext.Provider>
  )
}

export function useTrialPortal(): TrialPortalContextValue | null {
  return useContext(TrialPortalContext)
}

/** Alias for `useTrialPortal` — same NextKick portal for trial, birthday, and camp. */
export const useNextKickPortal = useTrialPortal
