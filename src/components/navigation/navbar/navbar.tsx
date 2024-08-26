'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Button, Typography } from '@mui/material'
import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#2d2d2d' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link href="/" passHref legacyBehavior>
                            <Button color="inherit" component="a">
                                ZKABE
                            </Button>
                        </Link>
                    </Typography>
                    <Box sx={{ mr: 2 }}>
                        <Link href="/encrypt" passHref legacyBehavior>
                            <Button color="inherit" component="a">
                                Encrypt
                            </Button>
                        </Link>
                        <Link href="/register" passHref legacyBehavior>
                            <Button color="inherit" component="a">
                                Register
                            </Button>
                        </Link>
                        <Link href="/mint" passHref legacyBehavior>
                            <Button color="inherit" component="a">
                                Mint
                            </Button>
                        </Link>
                        <Link href="/decrypt" passHref legacyBehavior>
                            <Button color="inherit" component="a">
                                Decrypt
                            </Button>
                        </Link>
                    </Box>
                    <ConnectKitButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
