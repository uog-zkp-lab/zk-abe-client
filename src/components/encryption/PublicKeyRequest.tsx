'use client'

import * as React from 'react'
import { Box, Typography, Button, CircularProgress, Fade } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import init, { generate_public_key } from '@/pkg'
import { createClient } from '@supabase/supabase-js'

interface PublicKeyRequestProps {
    onPublicKeyRetrieved: (publicKey: string) => void
}
const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

const PublicKeyRequest: React.FC<PublicKeyRequestProps> = ({
    onPublicKeyRetrieved,
}) => {
    const [publicKey, setPublicKey] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

    const handleRequestPublicKey = async () => {
        setError(null)
        setIsLoading(true)
        setIsSuccess(false)

        try {
            // retrieve public key from supabase
            const { data: pk, error } = await supabaseClient
                .from('keys')
                .select('public_key')
                .single()
            console.log(pk)

            if (error) {
                throw new Error(error.message)
            }

            if (pk) {
                // simulate a 1 sec delay
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setPublicKey(pk.public_key)
                onPublicKeyRetrieved(pk.public_key)
                setIsSuccess(true)
                setIsSuccess(true)
            } else {
                throw new Error('Public key not found!')
            }
        } catch (err) {
            setError('Failed to fetch public key.')
            console.error('Error fetching public key:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box>
            <Typography variant="h6">Request Public Key</Typography>
            <Button
                variant="contained"
                onClick={handleRequestPublicKey}
                disabled={isLoading || isSuccess}
                startIcon={
                    isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : null
                }
            >
                {isLoading ? 'Requesting...' : 'Request Public Key'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Fade in={isSuccess} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography color="success" sx={{ ml: 1 }}>
                        Public key successfully retrieved!
                    </Typography>
                </Box>
            </Fade>
        </Box>
    )
}

export default PublicKeyRequest
