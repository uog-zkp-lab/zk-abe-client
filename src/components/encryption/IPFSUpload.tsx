import React, { useState } from 'react'
import { Button, TextField, Typography, Box, Fade } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { PinataSDK } from 'pinata'

interface IPFSUploadProps {
    ciphertext: string | null
    onUpload: (ipfsHash: string) => void
}

const IPFSUpload: React.FC<IPFSUploadProps> = ({ ciphertext, onUpload }) => {
    const [policy, setPolicy] = useState<string>('')
    const [passAttributes, setPassAttributes] = useState<string>('')
    const [failAttributes, setFailAttributes] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleUpload = async () => {
        setError(null)
        setIsSuccess(false)

        try {
            const pinata = new PinataSDK({
                pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
                pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY!,
            })

            const data = {
                ciphertext,
                policy,
                passAttributes,
                failAttributes,
            }

            const result = await pinata.upload.json(data)
            onUpload(result.IpfsHash)
            setIsSuccess(true)
        } catch (err) {
            setError(
                'Error uploading data to IPFS: ' +
                    (err instanceof Error ? err.message : 'Unknown error'),
            )
        }
    }

    return (
        <Box>
            <Typography variant="h6">Upload to IPFS</Typography>
            <TextField
                fullWidth
                label="Policy"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Pass Attributes (comma-separated) i.e. 'A,B,C,D' "
                value={passAttributes}
                onChange={(e) => setPassAttributes(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Fail Attributes (comma-separated)  i.e. 'B,C,D,E'"
                value={failAttributes}
                onChange={(e) => setFailAttributes(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isSuccess}
            >
                Upload to IPFS
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Fade in={isSuccess} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography color="success" sx={{ ml: 1 }}>
                        Data successfully uploaded to IPFS!
                    </Typography>
                </Box>
            </Fade>
        </Box>
    )
}

export default IPFSUpload
