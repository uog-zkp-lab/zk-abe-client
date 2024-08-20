import React, { useState, useEffect } from 'react'
import init, { encrypt } from '@/pkg'
import { Button, TextField, Typography, Box, Fade } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

interface DataEncryptionProps {
    publicKey: string | null
    onEncryption: (ciphertext: string) => void
}

const DataEncryption: React.FC<DataEncryptionProps> = ({
    publicKey,
    onEncryption,
}) => {
    const [plaintext, setPlaintext] = useState<string>('')
    const [policy, setPolicy] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        init()
    }, [])

    const handleEncrypt = async () => {
        setError(null)
        setIsSuccess(false)

        if (!publicKey || !plaintext || !policy) {
            setError('All fields are required')
            return
        }

        try {
            const encodedPlaintext = new TextEncoder().encode(plaintext)
            const result = encrypt(publicKey, policy, encodedPlaintext)
            console.log('result', result)
            onEncryption(result as string)
            setIsSuccess(true)
        } catch (err) {
            const errorMessage = (err as Error).message || 'Encryption failed'
            setError(errorMessage)
            console.error('Encryption error details:', err)
        }
    }

    return (
        <Box>
            <Typography variant="h6">Data Encryption</Typography>
            <TextField
                fullWidth
                label="Plaintext"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Policy"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleEncrypt}
                disabled={isSuccess}
            >
                Encrypt
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Fade in={isSuccess} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography color="success" sx={{ ml: 1 }}>
                        Data successfully encrypted!
                    </Typography>
                </Box>
            </Fade>
        </Box>
    )
}

export default DataEncryption
