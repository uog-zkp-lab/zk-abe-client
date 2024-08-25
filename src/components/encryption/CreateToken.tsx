import React, { useState, useEffect } from 'react'
import { Typography, Box, Link, Button } from '@mui/material'
import { useWriteContract, usePublicClient } from 'wagmi'
import { decodeEventLog } from 'viem'
import AccessToken from '@/contracts/AccessToken.json'

interface CreateTokenProps {
    ipfsHash: string | null
}

const accessTokenAddress = process.env.NEXT_PUBLIC_ARB_SEP_ACTK_ADDRESS

const CreateToken: React.FC<CreateTokenProps> = ({ ipfsHash }) => {
    const { data: hash, isPending, isError, writeContract } = useWriteContract()
    const [tokenId, setTokenId] = useState<string | null>(null)
    const publicClient = usePublicClient()

    const handleCreateToken = async () => {
        const abi = AccessToken.abi
        if (accessTokenAddress && ipfsHash) {
            try {
                await writeContract({
                    address: accessTokenAddress as `0x${string}`,
                    abi,
                    functionName: 'createToken',
                    args: [ipfsHash],
                })
            } catch (error) {
                console.error('Error creating token:', error)
            }
        } else {
            console.error('Missing accessTokenAddress or ipfsHash')
        }
    }

    useEffect(() => {
        const getTokenId = async () => {
            if (hash) {
                try {
                    const receipt = await publicClient.getTransactionReceipt({
                        hash,
                    })
                    const tokenCreatedEvent = receipt.logs.find(
                        (log) =>
                            log.topics[0] ===
                            AccessToken.abi.find(
                                (e) => e.name === 'TokenCreated',
                            ),
                    )

                    if (tokenCreatedEvent) {
                        const decodedLog = decodeEventLog({
                            abi: AccessToken.abi,
                            data: tokenCreatedEvent.data,
                            topics: tokenCreatedEvent.topics,
                        })

                        if (decodedLog.args && 'tokenId' in decodedLog.args) {
                            const tokenIdValue = decodedLog.args.tokenId
                            if (
                                typeof tokenIdValue === 'bigint' ||
                                typeof tokenIdValue === 'number'
                            ) {
                                setTokenId(tokenIdValue.toString())
                            } else {
                                console.error(
                                    'Unexpected tokenId type:',
                                    typeof tokenIdValue,
                                )
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error fetching transaction receipt:', error)
                }
            }
        }

        getTokenId()
    }, [hash, publicClient])

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
        >
            <Typography variant="h6">Create Token</Typography>
            {ipfsHash ? (
                <Box>
                    <Typography>IPFS Hash: {ipfsHash}</Typography>
                    <Button
                        variant="contained"
                        onClick={handleCreateToken}
                        disabled={isPending}
                    >
                        {isPending ? 'Creating...' : 'Create Token'}
                    </Button>
                    {isError && (
                        <Typography color="error" mt={2}>
                            Error creating token. Please try again.
                        </Typography>
                    )}
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
                                Please click in the link and copy the token
                                ID!!!
                            </Typography>
                        </Box>
                    )}
                </Box>
            ) : (
                <Typography>
                    No IPFS hash available. Please complete the previous steps.
                </Typography>
            )}
        </Box>
    )
}

export default CreateToken
