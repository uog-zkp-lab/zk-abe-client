'use client'

import * as React from 'react'
import { useWriteContract } from 'wagmi'
import { getAttributesHash } from '@/components/register/utils'
import AccessToken from '@/contracts/AccessToken.json'
import { Box, Button, Container, Input, Link, Typography } from '@mui/material'

const accessTokenAddress = process.env.NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS

export default function Register() {
    const [attributesFile, setAttributesFile] = React.useState<File | null>(
        null,
    )
    const { data: hash, writeContract } = useWriteContract()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttributesFile(e.target.files[0])
        }
    }

    const handleRegister = async () => {
        const abi = AccessToken.abi
        if (!attributesFile) {
            console.error('No attributes file uploaded')
            return
        }

        try {
            const attributesHash = await getAttributesHash(attributesFile)
            if (accessTokenAddress) {
                await writeContract({
                    address: accessTokenAddress as `0x${string}`,
                    abi,
                    functionName: 'registerDP',
                    args: [attributesHash],
                })
            } else {
                console.error('Missing Access Token Address')
            }
        } catch (error) {
            console.error('Error registering data processor:', error)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Container maxWidth="sm">
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        Data Processor Registration
                    </Typography>
                    <Box my={3}>
                        <Input
                            type="file"
                            onChange={handleFileUpload}
                            inputProps={{ accept: 'application/json' }}
                            fullWidth
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleRegister}
                        disabled={!attributesFile}
                        fullWidth
                    >
                        Register Data Processor
                    </Button>
                    {hash && (
                        <Box>
                            <Typography color="success.main" mt={2}>
                                Transaction hash:
                                <Link
                                    href={`https://sepolia.arbiscan.io/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {hash}
                                </Link>
                            </Typography>
                            <Typography color="error" mt={2}>
                                You are registered! Make sure to keep your
                                attributes!
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    )
}
