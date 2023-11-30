import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAdmin } from 'context/AdminProvider'
import { useAlert } from 'context'
import Grid from '@mui/material/Grid'
import Card from 'components/Card'
import ViewScreen from 'components/Screen/ViewScreen'

const ViewUsersScreen = () => {
    const navigate = useNavigate()
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
        <ViewScreen
            heading='List of users'
            subheading='Click SELECT to view the details'
        >
            {users.map(user => {
                const { _id, name, surname, role } = user
                return (
                    <Grid key={_id} item xs={12}>
                        <Card
                            title={`${name} ${surname}`}
                            description={`${role}`}
                            onClick={() => { navigate(_id, { state: { user } }) }}
                        />
                    </Grid>
                )
            })}
        </ViewScreen>
    )
}

export default ViewUsersScreen
