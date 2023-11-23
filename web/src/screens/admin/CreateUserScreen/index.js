import React, { useState } from 'react'

import { useAlert } from 'context'
import { useAdmin } from 'context/AdminProvider'
import { useNavigate } from 'react-router-dom'

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
import Grid from '@mui/material/Grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CreateUserScreen = () => {
    const { createUser } = useAdmin()
    const { activateLoading, stopLoadingAndShowAlert } = useAlert()
    const navigate = useNavigate()

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
            navigate('/')
            stopLoadingAndShowAlert(true, 'The user is successfully created!')
        }).catch(err => {
            console.error(err)
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen maxWidth='sm'>
            <Typography variant='h5' sx={styles.heading}>
                Create a user
            </Typography>
            <Typography variant='p' sx={styles.subheading}>
                Note that for a user of the driver type you will have to also input the license number.
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl>
                            <FormLabel>Type</FormLabel>
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
                    </Grid>
                    <Grid item xs={8}>
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
                    </Grid>
                </Grid>
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
                    fullWidth
                    variant='outlined'
                    sx={{ mt: 3, mb: 2 }}
                    startIcon={<ArrowBackIcon />}
                >Go back</Button>
            </Link>
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
        mb: 5,
        fontSize: 20,
        textAlign: 'center',
        opacity: 0.8
    },
}

export default CreateUserScreen