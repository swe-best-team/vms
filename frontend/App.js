import React, { FunctionComponent } from 'react'
import { SafeAreaView, Text } from 'react-native'

import MainProvider from 'context'
import RootNavigation from 'navigation'

const App = () => (
    <MainProvider>
        <SafeAreaView>
            <RootNavigation />
        </SafeAreaView>
    </MainProvider>
)

export default App
