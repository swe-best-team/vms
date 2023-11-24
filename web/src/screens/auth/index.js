import React from 'react'

import { useAuth, useAlert } from 'context'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Screen from 'components/Screen'

// TODO remove, this demo shouldn't need to reset the theme.

const AuthScreen = () => {
    const { login } = useAuth()
    const { activateLoading, stopLoading, stopLoadingAndShowAlert } = useAlert()

    const handleSubmit = event => {
        event.preventDefault()
        activateLoading()
        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const password = data.get('password')

        login(email, password).then(() => {
            stopLoading()
        }).catch(err => {
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen maxWidth='xs'>
            <Typography variant='h4' sx={styles.heading}>
                Input your credentials
            </Typography>
            <Typography variant='p' sx={styles.subheading}>
                Note that accounts are added by an admin user only
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    value='admin@email.com'
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    value='alihan123'
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Screen>
    )
}

const styles = {
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        mb: 3
    },
    subheading: {
        fontSize: 20,
        textAlign: 'center',
        opacity: 0.8
    }
}

export default AuthScreen