import React, { useEffect } from 'react'

import { useAlert } from 'context'
import { useDriver } from 'context/DriverProvider'

import Screen from 'components/Screen'
import Field from 'components/Field'

const SingleTaskScreen = ({ route }) => {
    const { } = useDriver()
    const { activateLoading, stopLoading } = useAlert()
    let { task } = route.params

    if (task.completed) task.status = 'COMPLETED'
    else task.status = 'INCOMPLETED'
    delete task.completed

    return (
        <Screen>
            {Object.keys(task).map(key =>
                <Field
                    key={key}
                    name={key}
                    val={task[key]}
                />
            )}
        </Screen>
    )
}

export default SingleTaskScreen