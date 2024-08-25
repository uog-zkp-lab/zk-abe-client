'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { GenerateProof, MintToken } from '@/components/mint'

const steps = ['Generate Proof', 'Mint Token']

export default function MintTokenProcess() {
    const [activeStep, setActiveStep] = React.useState(0)
    const [response, setResponse] = useState(null)
    const [attributeHash, setAttributeHash] = useState('')
    const [isTokenMinted, setIsTokenMinted] = useState(false)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setResponse(null)
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <GenerateProof
                        onResponse={setResponse}
                        onAttributeHash={setAttributeHash}
                    />
                )
            case 1:
                return (
                    <MintToken
                        response={response}
                        onTokenMinted={setIsTokenMinted}
                        attributeHash={attributeHash}
                    />
                )
            default:
                return 'Unknown step'
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mt-4 mb-4">Mint Token Process</h1>
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
                                All steps completed - you&apos;ve minted your
                                token!
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
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        activeStep === 0 ? !response : false
                                    }
                                >
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
