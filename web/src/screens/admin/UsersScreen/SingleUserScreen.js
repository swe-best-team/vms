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
            <p></p>
            <Button style = {{backgroundColor: 'red', color: 'white'}}>Delete the user</Button>
            <GoBackBtn />
            
        </Screen>
    )
}

export default SingleUserScreen