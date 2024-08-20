import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export function getConfig() {
    return createConfig({
        chains: [arbitrumSepolia],
        ssr: true,
        connectors: [coinbaseWallet()],
        storage: createStorage({
            storage: cookieStorage,
        }),
        transports: {
            [arbitrumSepolia.id]: http(
                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
            ),
        },
    })
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>
    }
}
