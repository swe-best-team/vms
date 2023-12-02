import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import Screen from 'components/Screen'
import GoBackBtn from 'components/GoBackBtn'
import Field from 'components/Field'
import { Button } from '@mui/material'
import { useAdmin } from 'context/AdminProvider'
import { useAlert } from 'context'
import Vehicles from './Vehicles'

const SingleUserScreen = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { user } = state

    const { removeUser } = useAdmin()
    const { activateLoading, stopLoadingAndShowAlert, stopLoading } = useAlert()

    const additionalData = getAdditionalData(user)

    const remove = () => {
        activateLoading()

        removeUser(user._id).then(() => {
            console.log('the user removed!')
            stopLoading()
            navigate('/view/users')
        }).catch(err => {
            console.error(err)
            stopLoadingAndShowAlert(false, err)
        })
    }

    return (
        <Screen>
            {Object.keys(user).map(key =>
                <Field
                    key={key}
                    name={key}
                    val={user[key]}
                />
            )}
            {additionalData}
            <Button
                color='error'
                sx={{ mt: 2 }}
                onClick={remove}
            >Delete the user</Button>
            <GoBackBtn link='/view/users' />
        </Screen>
    )
}

const getAdditionalData = user => {
    switch (user.role) {
        case 'driver': return <Vehicles driver={user._id} />
        default: return <></>
    }
}

export default SingleUserScreen