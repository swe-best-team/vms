import React from 'react'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

const Screen = ({ children, ...props }) => {
    return (
        <Container component='main' {...props}>
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >{children}</Box>
        </Container>
    )
}

export default Screen