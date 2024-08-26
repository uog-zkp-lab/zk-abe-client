'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Import decryption components (you'll need to create these)
import { SecretKeyRequest, DataDecrypt } from '@/components/decryption'

const steps = ['Request Secret Key', 'Decrypt Data']

export default function DecryptionProcess() {
    const [activeStep, setActiveStep] = React.useState(0)
    const [secretKey, setSecretKey] = useState<string | null>(null)
    const [plaintext, setPlaintext] = useState<string | null>(null)
    const [tokenId, setTokenId] = useState<string | null>(null)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setSecretKey(null)
        setPlaintext(null)
    }

    /// 2 steps in decryption:
    /// 1. Requesting Secret Key
    /// 2. Decrypting Ciphertext and return plaintext or NULL if decryption fails
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <SecretKeyRequest
                        onSecretKeyRetrieved={setSecretKey}
                        onTokenIdRetrieved={setTokenId}
                    />
                )
            case 1:
                return (
                    <DataDecrypt
                        secretKey={secretKey}
                        tokenId={tokenId}
                        onDecryption={setPlaintext}
                    />
                )
            default:
                return 'Unknown step'
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mt-4 mb-4">Decryption Phase</h1>
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
