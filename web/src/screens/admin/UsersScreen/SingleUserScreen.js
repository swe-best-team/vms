import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import Screen from 'components/Screen'
import GoBackBtn from 'components/GoBackBtn'
import Field from 'components/Field'
import { Button } from '@mui/material'

const SingleUserScreen = () => {
    const { state } = useLocation()
    const { user } = state

    return (
        <Screen>
            {Object.keys(user).map(key =>
                <Field
                    key={key}
                    name={key}
                    val={user[key]}
                />
            )}
            <GoBackBtn />
            <Button>Delete the user</Button>
        </Screen>
    )
}

export default SingleUserScreen