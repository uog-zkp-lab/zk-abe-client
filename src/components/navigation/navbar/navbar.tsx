"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

import { ConnectKitButton } from 'connectkit'

export default function Navbar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{backgroundColor: '#2d2d2d'}}>
                <Toolbar> 
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ZKABE
                    </Typography>
                    <ConnectKitButton/> 
                </Toolbar>
            </AppBar>
        </Box>
    );
}
