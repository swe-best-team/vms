import MainProvider from 'context'
import RootRouter from 'router'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const App = () =>
  <MainProvider>
    <RootRouter />
  </MainProvider>

export default App