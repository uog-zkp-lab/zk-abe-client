import React, { useState, useEffect } from 'react'
import init, { decrypt } from '@/pkg'
import {
    Button,
    TextField,
    Typography,
    Box,
    Fade,
    CircularProgress,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import { createPublicClient, http } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import AccessToken from '@/contracts/AccessToken.json'

interface DataDecryptionProps {
    tokenId: any
    secretKey: string | null
    onDecryption: (plaintext: string) => void
}

export default function DataDecrypt({
    tokenId,
    secretKey,
    onDecryption,
}: DataDecryptionProps) {
    const [ciphertext, setCiphertext] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const [isFetchingCiphertext, setIsFetchingCiphertext] =
        useState<boolean>(false)
    const [isCiphertextFetched, setIsCiphertextFetched] =
        useState<boolean>(false)
    const [decryptedText, setDecryptedText] = useState<string>('')

    useEffect(() => {
        init()
    }, [])

    const fetchCiphertext = async () => {
        setIsFetchingCiphertext(true)
        setError(null)

        const contractAddress = process.env
            .NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS as `0x${string}`
        const provider = createPublicClient({
            chain: arbitrumSepolia,
            transport: http(
                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || ''}`,
            ),
        })

        const cid = await provider.readContract({
            address: contractAddress,
            abi: AccessToken.abi,
            functionName: 'getCid',
            args: [BigInt(tokenId)],
        })

        const ipfsGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY
        const ipfsUrl = `${ipfsGateway}${cid}`
        const ipfsResponse = await fetch(ipfsUrl)
        const ipfsData = await ipfsResponse.json()
        console.log(ipfsData.ciphertext)

        setIsFetchingCiphertext(false)
        setIsCiphertextFetched(true)

        setCiphertext(ipfsData.ciphertext)
    }

    const handleDecrypt = async () => {
        setError(null)
        setIsSuccess(false)

        if (!secretKey || !ciphertext) {
            setError('Both secret key and ciphertext are required')
            return
        }

        try {
            const result = decrypt(secretKey, ciphertext)
            const decodedPlaintext = new TextDecoder().decode(result)
            console.log('Decrypted result:', decodedPlaintext)
            setDecryptedText(decodedPlaintext)
            onDecryption(decodedPlaintext)
            setIsSuccess(true)
        } catch (err) {
            const errorMessage = (err as Error).message || 'Decryption failed'
            setError(errorMessage)
            console.error('Decryption error details:', err)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
            gap={2}
        >
            <Typography variant="h6" gutterBottom>
                Data Decryption
            </Typography>
            <Button
                variant="contained"
                onClick={fetchCiphertext}
                disabled={isFetchingCiphertext || isCiphertextFetched}
                startIcon={
                    isFetchingCiphertext ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : null
                }
                sx={{ mb: 2 }}
            >
                {isFetchingCiphertext ? 'Fetching...' : 'Fetch Ciphertext'}
            </Button>
            <Button
                variant="contained"
                onClick={handleDecrypt}
                disabled={!isCiphertextFetched || isSuccess}
                sx={{ mb: 2 }}
            >
                Decrypt
            </Button>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            <Fade in={isCiphertextFetched && !isSuccess} timeout={500}>
                <Typography sx={{ mb: 2 }}>
                    Ciphertext fetched successfully!
                </Typography>
            </Fade>
            <Fade in={isSuccess} timeout={500}>
                <Typography
                    color="success.main"
                    sx={{ mt: 2, fontWeight: 'bold' }}
                >
                    {decryptedText}
                </Typography>
            </Fade>
        </Box>
    )
}
