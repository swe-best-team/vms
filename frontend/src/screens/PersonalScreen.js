import React from 'react'

import { useAuth } from 'context'

import Screen from 'components/Screen'

import Field from 'components/Field'

const PersonalScreen = () => {
    const { user } = useAuth()
    const { name, surname } = user

    return (
        <Screen>
            {Object.keys(user).map(key =>
                <Field
                    key={key}
                    name={key}
                    val={user[key]}
                />
            )}
        </Screen>
    )
}

export default PersonalScreen