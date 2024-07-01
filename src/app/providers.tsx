'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, createConfig, createStorage, cookieStorage, http, WagmiProvider } from 'wagmi'
import { localhost, arbitrumSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'
import { getConfig } from '@/wagmi'
import { Navbar, Footer } from '@/components/navigation'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [localhost, arbitrumSepolia],
    transports: {
      [localhost.id]: http(
        `http://127.0.0.1:8545`
      ),
      [arbitrumSepolia.id]: http(
        `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`)
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '',

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <Navbar />
                  <main style={{ flex: "1" }}>{props.children}</main>
                  <Footer />
                </div>
              </body>
            </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
