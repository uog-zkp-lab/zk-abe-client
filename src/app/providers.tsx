'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, createConfig, http, WagmiProvider } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { getConfig } from '@/wagmi_helper'
import { Navbar, Footer } from '@/components/navigation'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { Box } from '@mui/material'

export const config = createConfig(
    getDefaultConfig({
        chains: [arbitrumSepolia],
        transports: {
            [arbitrumSepolia.id]: http(
                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
            ),
        },

        walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '',
        appName: 'Decentralized ZKABE System',

        appDescription:
            'This is a Decentralized ABE System leveraging zero knowledge virtual machine to preserve the privacy of data processor',
        appUrl: 'https://family.co',
        appIcon: 'https://family.co/logo.png',
    }),
)

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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '100vh',
                            }}
                        >
                            <Navbar />
                            <Box component="main" sx={{ flexGrow: 1 }}>
                                {props.children}
                            </Box>
                            <Footer />
                        </Box>
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
