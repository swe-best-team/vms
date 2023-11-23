import React from 'react'

import MainProvider from 'context'
import RootNavigation from 'navigation'

import { enableLatestRenderer } from 'react-native-maps'
enableLatestRenderer()

const App = () => (
  <MainProvider>
    <RootNavigation />
  </MainProvider>
)

export default App
