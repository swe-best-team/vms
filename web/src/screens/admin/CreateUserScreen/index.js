import React, { useState } from 'react'

import { useAlert } from 'context'
import { useAdmin } from 'context/AdminProvider'

import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Screen from 'components/Screen'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const CreateUserScreen = () => {
    const { createUser } = useAdmin()
    const { activateLoading, stopLoadingAndShowAlert } = useAlert()

    const [licenseShown, setLicenseShown] = useState(true)

    const handleRoleChange = event => {
        const role = event.currentTarget.value
        if (role === 'driver')
            return setLicenseShown(true)
        setLicenseShown(false)
    }
    const handleSubmit = event => {
        event.preventDefault()
        activateLoading()
        const data = new FormData(event.currentTarget)
        const role = data.get('role')
        const name = data.get('name')
        const surname = data.get('surname')
        const email = data.get('email')
        const password = data.get('password')
        const confirmPassword = data.get('confirmPassword')
        const license = data.get('license')

        const user = {
            role, name, surname, email,
            password, confirmPassword, license
        }
        createUser(user).then(() => {
            console.log('a user created!')
            stopLoadingAndShowAlert(true, 'The user is successfully created!')
        }).catch(err => {
            console.error(err)
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen>
            <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
                Create a user
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby='demo-radio-buttons-group-label'
                        defaultValue='driver'
                        name='role'
                        onChange={handleRoleChange}
                    >
                        <FormControlLabel value='driver' control={<Radio />} label='Driver' />
                        <FormControlLabel value='fueler' control={<Radio />} label='Fueler' />
                        <FormControlLabel value='maintainer' control={<Radio />} label='Maintainer' />
                        <FormControlLabel value='admin' control={<Radio />} label='Admin' />
                    </RadioGroup>
                </FormControl>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Name'
                    name='name'
                    autoComplete='name'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Surname'
                    name='surname'
                    autoComplete='surname'
                />
                {licenseShown &&
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        label='License'
                        name='license'
                        autoComplete='license'
                    />
                }
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='confirmPassword'
                    label='Confirm password'
                    type='password'
                    autoComplete='confirm-password'
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create
                </Button>
            </Box>
            <Link to='/'>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >Go back</Button>
            </Link>
        </Screen>
    )
}

export default CreateUserScreen