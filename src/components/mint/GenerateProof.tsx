'use client'

import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Container,
    Input,
    Typography,
    TextField,
    CircularProgress,
} from '@mui/material'
import { convertAttributes } from '@/components/register/utils'
import { useReadContract } from 'wagmi'
import { parseAbi } from 'viem'
import AccessToken from '@/contracts/AccessToken.json'
import { getAttributesHash } from '@/components/register/utils'

const accessTokenAddress = process.env.NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS
const abi = AccessToken.abi

interface GenerateProofProps {
    onResponse: (response: any) => void
    onAttributeHash: (attributeHash: string) => void
}

const GenerateProof: React.FC<GenerateProofProps> = ({
    onResponse,
    onAttributeHash,
}) => {
    const [attributesFile, setAttributesFile] = useState<File | null>(null)
    const [tokenId, setTokenId] = useState('')
    const [cid, setCid] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [proofGenerated, setProofGenerated] = useState(false)

    const { data } = useReadContract({
        address: accessTokenAddress as `0x${string}`,
        abi: parseAbi([
            'function getCid(uint256 tokenId) view returns (string)',
        ]),
        functionName: 'getCid',
        args: [BigInt(tokenId)],
    })

    useEffect(() => {
        if (data) {
            setCid(data as string)
        }
    }, [data, tokenId])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttributesFile(e.target.files[0])
        }
    }

    const handleGenerateProof = async () => {
        if (!attributesFile || !tokenId) {
            setError('All fields are required')
            return
        }

        const attributeHash = await getAttributesHash(attributesFile)
        onAttributeHash(attributeHash)
        setIsLoading(true)
        setError(null)

        try {
            const attributesContent = await attributesFile.text()
            const attributes = JSON.parse(attributesContent)
            const attributesString = convertAttributes(attributes)

            if (!cid) {
                throw new Error('Failed to fetch CID')
            }

            const requestBody = {
                attributes: attributesString,
                token_id: tokenId,
                cid,
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_ZKSERVER_URL}/api/generate_proof`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    body: JSON.stringify(requestBody),
                },
            )

            if (!response.ok) {
                throw new Error('Failed to generate proof')
            }

            const proofData = await response.json()

            onResponse(proofData)
            setProofGenerated(true)
        } catch (error) {
            console.error('Error generating proof:', error)
            setError('Failed to generate proof. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
        >
            <Container maxWidth="sm">
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        Generate Proof
                    </Typography>
                    <Box my={3}>
                        <Input
                            type="file"
                            onChange={handleFileUpload}
                            inputProps={{ accept: 'application/json' }}
                            fullWidth
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label="Token ID"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        onClick={handleGenerateProof}
                        disabled={!attributesFile || isLoading}
                        fullWidth
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Generate Proof'
                        )}
                    </Button>
                    {error && (
                        <Typography color="error" mt={2}>
                            {error}
                        </Typography>
                    )}
                    {proofGenerated && (
                        <Typography color="success.main" mt={2}>
                            Proof generated successfully!
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    )
}

export default GenerateProof
