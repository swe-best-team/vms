import React from 'react'

import FuelerProvider from 'context/FuelerProvider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PersonalScreen from 'screens/PersonalScreen'
import FuelerScreen from 'screens/fueler'
import CreateFuelingScreen from 'screens/fueler/CreateFuelingScreen.js'

const Tab = createNativeStackNavigator()
const { Screen, Navigator } = Tab

const FuelerNavigator = () =>
    <FuelerProvider>
        <Navigator
            initialRouteName='FuelerScreen'
        >
            <Screen
                name='PersonalScreen'
                component={PersonalScreen}
                options={{ title: 'Personal Info' }}
            />
            <Screen
                name='FuelerScreen'
                component={FuelerScreen}
                options={{ title: 'Fueler' }}
            />
            <Screen
                name='CreateFuelingScreen'
                component={CreateFuelingScreen}
                options={{ title: 'Create a fueling' }}
            />
        </Navigator>
    </FuelerProvider>

export default FuelerNavigator