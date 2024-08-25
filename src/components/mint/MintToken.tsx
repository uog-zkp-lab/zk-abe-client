import React, { useState } from 'react'
import { Typography, Box, Button, CircularProgress } from '@mui/material'
import { useWriteContract, useAccount } from 'wagmi'
import AccessToken from '@/contracts/AccessToken.json'
import * as ethers from 'ethers'

interface MintTokenProps {
    response: any
    attributeHash: string
    onTokenMinted: (isTokenMinted: boolean) => void
}

const accessTokenAddress = process.env.NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS
const abi = AccessToken.abi

const MintToken: React.FC<MintTokenProps> = ({
    response,
    attributeHash,
    onTokenMinted,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { writeContract, data: hash, error: writeError } = useWriteContract()
    const { address } = useAccount()

    const mint = async (seal: any, tokenId: any, attributeHash: any) => {
        if (typeof window.ethereum === 'undefined') {
            setError('Ethereum provider not found')
            return
        }
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            accessTokenAddress as `0x${string}`,
            abi,
            signer,
        )

        try {
            const tx = await contract.mintAccessTokenForDP(
                seal,
                BigInt(tokenId),
                attributeHash,
                {
                    gasLimit: 1000000,
                },
            )
            const receipt = await tx.wait()
            return receipt
        } catch (err) {
            setError('Failed to mint token. Please try again.')
            console.error('Error minting token:', err)
        }
    }

    const handleMintToken = async () => {
        setIsLoading(true)
        setError(null)

        if (!response) {
            setError('Missing response')
            setIsLoading(false)
            return
        }

        if (!address) {
            setError('Wallet not connected')
            setIsLoading(false)
            return
        }

        try {
            const result = await mint(
                response.seal,
                response.token_id,
                attributeHash,
            )
            console.log('Mint result:', result)
            onTokenMinted(true)
        } catch (err) {
            setError('Failed to mint token. Please try again.')
            console.error('Error minting token:', err)
            if (err instanceof Error) {
                console.error('Error message:', err.message)
                console.error('Error stack:', err.stack)
            }
            console.error('Full error object:', JSON.stringify(err, null, 2))
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        if (writeError) {
            console.error('Write Contract Error:', writeError)
            setError('Error writing to contract: ' + writeError.message)
        }
    }, [writeError])

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
        >
            <Typography variant="h6">Mint Token</Typography>
            <Button
                variant="contained"
                onClick={handleMintToken}
                disabled={!response || isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Mint Token'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    )
}

export default MintToken
