/// This page is the main page for data owner to encrypt their data

'use client'

import React, { useState } from 'react'

// mui
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// components
import {
    CreateToken,
    DataEncrypt,
    IPFSUpload,
    PublicKeyRequest,
} from '@/components/encryption'

const steps = [
    'Request Public Key',
    'Encrypt Data',
    'Upload to IPFS',
    'Create Token',
]

export default function EncryptionProcess() {
    const [activeStep, setActiveStep] = React.useState(0)
    const [publicKey, setPublicKey] = useState<string | null>(null)
    const [ciphertext, setCiphertext] = useState<string | null>(null)
    const [ipfsHash, setIpfsHash] = useState<string | null>(null)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setPublicKey(null)
        setCiphertext(null)
        setIpfsHash(null)
    }

    /// The 4 steps in encrpytion:
    /// 1. Requesting Public Key
    /// 2. Encrypting Data
    /// 3. Uploading to IPFS
    /// 4. Create Token
    /// we don't want the kgs to have too much power, so we let the data owner encrypt their plaintext themselves
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <PublicKeyRequest onPublicKeyRetrieved={setPublicKey} />
            case 1:
                return (
                    <DataEncrypt
                        publicKey={publicKey}
                        onEncryption={setCiphertext}
                    />
                )
            case 2:
                return (
                    <IPFSUpload
                        ciphertext={ciphertext}
                        onUpload={setIpfsHash}
                    />
                )
            case 3:
                return <CreateToken ipfsHash={ipfsHash} />
            default:
                return 'Unknown step'
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mt-4 mb-4">Encryption Phase</h1>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ mt: 2, mb: 1 }}>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1
                                        ? 'Finish'
                                        : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Box>
        </div>
    )
}
