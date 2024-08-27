import { NextResponse } from 'next/server'

import init, { setup, keygen } from '@/pkg'
import wasmUrl from '@/wasm_config'

import { createPublicClient, http, getContract } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import AccessToken from '@/contracts/AccessToken.json'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const abi = AccessToken.abi
const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const parseAttributes = (attrString: string): string[] => {
    const trimmed = attrString.replace(/^"|"$/g, '')
    return trimmed.split(',').map((attr) => attr.trim())
}

export async function POST(request: Request) {
    const { address, tokenId, signature } = await request.json()

    console.log(address, tokenId, signature)

    const contractAddress = process.env
        .NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS as `0x${string}`

    try {
        const provider = createPublicClient({
            chain: arbitrumSepolia,
            transport: http(
                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || ''}`,
            ),
        })

        const pass = await provider.readContract({
            address: contractAddress,
            abi,
            functionName: 'getDPBalance',
            args: [address, tokenId, signature],
        })

        console.log(pass)

        const cid = await provider.readContract({
            address: contractAddress,
            abi,
            functionName: 'getCid',
            args: [tokenId],
        })

        console.log(cid)

        const ipfsGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY
        const ipfsUrl = `${ipfsGateway}${cid}`
        const ipfsResponse = await axios.get(ipfsUrl)
        const ipfsData = ipfsResponse.data
        let attr

        if (pass) {
            // fetch passed_attr from ipfs
            attr = ipfsData.passAttributes
        } else {
            // fetch failed_attr from ipfs
            attr = ipfsData.failAttributes
        }
        const attributes = parseAttributes(attr)
        console.log(attributes)

        const { data: keys, error: keysError } = await supabaseClient
            .from('keys')
            .select('public_key, master_secret_key')
            .single()

        if (keysError) {
            throw new Error('Failed to fetch keys from supabase')
        }

        const { public_key: pk, master_secret_key: msk } = keys
        console.log('\n\n==================================\n\n')
        console.log(pk)
        console.log('\n\n==================================\n\n')
        console.log(msk)
        console.log('\n\n==================================\n\n')

        let sk: any

        await init(wasmUrl)
        if (pk && msk) {
            sk = keygen(pk, msk, JSON.stringify(attributes))
        }
        if (!sk) {
            throw new Error('Failed to generate secret key')
        }

        return NextResponse.json({ secretKey: sk })
    } catch (error) {
        console.error('Error generating secret key:', error)
        return NextResponse.json({
            error: error,
            message: 'Failed to generate secret key',
        })
    }
}
