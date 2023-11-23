import React from 'react'

import { useAuth } from 'context'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Screen from 'components/Screen'
import Card from 'components/Card'
import Grid from '@mui/material/Grid'
import LogoutIcon from '@mui/icons-material/Logout'

const actions = [
    {
        title: 'Create a user',
        description: 'Create a new account for users so that they can log in by their own',
        location: '/create/user'
    },
    {
        title: 'Create a task',
        description: 'Assign routes to a driver that he will have to take',
        location: '/create/task'
    }
]

const AdminScreen = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            <Typography variant='h4' sx={styles.heading}>
                Welcome, admin {`${name} ${surname}`}!
            </Typography>
            <Typography variant='p' sx={styles.subheading}>
                Select the kind of action you would like to take:
            </Typography>
            <Grid container spacing={2}>
                {actions.map((action, i) =>
                    <Grid key={i} item xs={4}>
                        <Card
                            title={action.title}
                            description={action.description}
                            onClick={() => { navigate(action.location) }}
                        />
                    </Grid>
                )}
            </Grid>
            <Button
                variant='outlined'
                sx={styles.logoutBtn}
                onClick={logout}
                startIcon={<LogoutIcon />}
            >Log out</Button>
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
    logoutBtn: {
        position: 'absolute',
        bottom: 30
    }
}

export default AdminScreen