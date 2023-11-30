import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import GoBackBtn from 'components/GoBackBtn'

import Screen from 'components/Screen'
import { useAdmin } from 'context/AdminProvider'
import { useAlert } from 'context'
import Grid from '@mui/material/Grid'

const ViewScreen = ({ heading, subheading, children }) => {
    const { getAllUsers } = useAdmin()
    const { activateLoading, stopLoading } = useAlert()

    const [users, setUsers] = useState([])

    useEffect(() => {
        activateLoading()
        getAllUsers().then(data => {
            console.log('users found!')
            setUsers(data)
            stopLoading()
        }).catch(err => {
            console.error(err)
            stopLoading()
        })
    }, [])

    return (
        <Screen maxWidth='sm'>
            <Typography variant='h5' sx={styles.heading}>
                {heading}
            </Typography>
            <Typography variant='p' sx={styles.subheading}>
                {subheading}
            </Typography>
            <Grid container spacing={2}>
                {children}
            </Grid>
            <GoBackBtn />
        </Screen>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        mb: 3
    },
    subheading: {
        fontSize: 20,
        textAlign: 'center',
        opacity: 0.8,
        mb: 4
    }
}

export default ViewScreen
