import { useMachine } from '@xstate/react'
import React from 'react'
import './App.css'
import Stage from './components/Stage/Stage'
import { AppMachine } from './machine'
import { AppContext } from './machine/context'



const App = () => {
  const [state, send] = useMachine(AppMachine)

  return (
    <AppContext.Provider value={[state, send ]}>
      <div className="App">
        <Stage />
      </div>
    </AppContext.Provider>
  )
}

export default App
