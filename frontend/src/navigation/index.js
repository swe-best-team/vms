import React, {
    useEffect
} from 'react'
import { View, Text } from 'react-native'

import { useAuth } from 'context'

const RootNavigation = () => {
    const { username } = useAuth()

    useEffect(() => console.log(username), [])

    return (
        <View>
            <Text>Hello, {username}</Text>
        </View>
    )
}

export default RootNavigation