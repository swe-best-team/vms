import React from 'react'

import { useAuth } from 'context'

import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Screen from 'components/Screen'

const AdminScreen = () => {
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Typography component='h1' variant='h5' sx={{textAlign: 'center'}}>
                Welcome, admin {`${name} ${surname}`}!
            </Typography>
            <Link to='/create/user'>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >Create a user</Button>
            </Link>
            <Link to='/create/task'>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >Create a task</Button>
            </Link>
            <Button
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={logout}
            >Log out</Button>
        </Screen>
    )
}

export default AdminScreen