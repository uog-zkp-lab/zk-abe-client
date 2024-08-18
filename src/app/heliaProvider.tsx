import { unixfs } from '@helia/unixfs'
import { createHelia } from 'helia'
import React, { useEffect, useState, useCallback, createContext, ReactNode } from 'react'

export const HeliaContext = createContext<{
  helia: any;
  fs: any;
  error: boolean;
  starting: boolean;
}>({
  helia: null,
  fs: null,
  error: false,
  starting: true
})

interface HeliaProviderProps {
  children: ReactNode;
}

export const HeliaProvider: React.FC<HeliaProviderProps> = ({ children }) => {
  const [helia, setHelia] = useState<any>(null)
  const [fs, setFs] = useState<any>(null)
  const [starting, setStarting] = useState(true)
  const [error, setError] = useState(false)

  const startHelia = useCallback(async () => {
    if (helia) {
      console.info('helia already started')
    } else if ('helia' in window) {
      console.info('found a windowed instance of helia, populating ...')
      setHelia((window as any).helia)
      setFs(unixfs((window as any).helia))
      setStarting(false)
    } else {
      try {
        console.info('Starting Helia')
        const heliaInstance = await createHelia()
        setHelia(heliaInstance)
        setFs(unixfs(heliaInstance))
        setStarting(false)
      } catch (e) {
        console.error(e)
        setError(true)
      }
    }
  }, [helia])

  useEffect(() => {
    startHelia()
  }, [startHelia])

  return (
    <HeliaContext.Provider
      value={{
        helia,
        fs,
        error,
        starting
      }}
    >
      {children}
    </HeliaContext.Provider>
  )
}
