'use client'

import React, { useState } from 'react'
import {
    Button,
    TextField,
    Typography,
    Box,
    CircularProgress,
    Fade,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ethers } from 'ethers'
import { useAccount, useSignMessage } from 'wagmi'

interface SecretKeyRequestProps {
    onSecretKeyRetrieved: (secretKey: string) => void
    onTokenIdRetrieved: (tokenId: string) => void
}

export default function SecretKeyRequest({
    onSecretKeyRetrieved,
    onTokenIdRetrieved,
}: SecretKeyRequestProps) {
    const [tokenId, setTokenId] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [cid, setCid] = useState<string | null>(null)
    const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const sendRequest = async (requestBody: any) => {
        const response = await fetch('/api/generatesk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            // const errorData = await response.json()
            throw new Error('Failed to generate secret key')
        }

        const data = await response.json()
        return data
    }

    const handleTokenIdChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTokenId(event.target.value)
        onTokenIdRetrieved(event.target.value)
    }

    const handleSkRequest = async () => {
        if (!address || !tokenId) {
            setError('Please connect your wallet and enter a token ID')
            return
        }

        try {
            setIsLoading(true)
            setIsSuccess(false)
            setError(null)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = await provider.getSigner()

            const message = ethers.utils.solidityPack(
                ['address', 'uint256'],
                [address, tokenId],
            )
            const messageHash = ethers.utils.keccak256(message)
            const signature = await signer.signMessage(
                ethers.utils.arrayify(messageHash),
            )

            const response = await sendRequest({
                address,
                tokenId,
                signature,
                messageHash,
            })

            console.log(response)
            onSecretKeyRetrieved(response.secretKey)
            setIsSuccess(true)
            setIsLoading(false)
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="45vh"
        >
            <Typography variant="h6" gutterBottom>
                Request Secret Key
            </Typography>
            <TextField
                label="Token ID"
                variant="outlined"
                fullWidth
                value={tokenId}
                onChange={handleTokenIdChange}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSkRequest}
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading || isSuccess}
                startIcon={
                    isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : null
                }
            >
                {isLoading ? 'Requesting...' : 'Request Secret Key'}
            </Button>
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
            <Fade in={isSuccess} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography color="success" sx={{ ml: 1 }}>
                        Secret key successfully retrieved!
                    </Typography>
                </Box>
            </Fade>
        </Box>
    )
}
