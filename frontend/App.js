import React from 'react'

import MainProvider from 'context'
import RootNavigation from 'navigation'

const App = () => (
  <MainProvider>
    <RootNavigation />
  </MainProvider>
)

export default App
