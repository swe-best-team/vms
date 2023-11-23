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
            <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
                Input your credentials
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

export default AuthScreen