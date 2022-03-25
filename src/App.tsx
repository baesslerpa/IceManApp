import { useMachine } from '@xstate/react'
import React, { Children, FunctionComponent, MouseEventHandler, useContext, useEffect } from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import Stage from './components/Stage/Stage'
import { AppMachine } from './machine'
import { AppContext } from './machine/context'



const App = () => {
  const [state, send] = useMachine(AppMachine)

  useEffect(() => {
    console.log('App state:', state)
  }, [state])
  

  return (
    <AppContext.Provider value={[state, send]}>
      <div className="App">

        {state.value === 'idle' && <StartScreen />}
        {state.value.breathing && <BreathScreen />}
        {state.value.holding && <HoldingScreen />}
        
        <Button onClick={() => send('NEXT')}>NEXT</Button>
      </div>
    </AppContext.Provider>
  )
}


const StartScreen = () => {
  return (
    <div className="StartScreen">
      <h1>Welcome to the app!</h1>
    </div>
  )
}


const BreathScreen = () => {

  const [state, send] = useContext(AppContext)

  return (
    <div className="StartScreen">
      <h1>Breath {state.context.breaths} / {state.context.maxBreaths} </h1>
    </div>
  )
}

const HoldingScreen = () => {
  const [state, send] = useContext(AppContext)

  useEffect(() => {
    const onDbClick = () => send('NEXT')
    window.addEventListener('dblclick' , onDbClick)
    return () => window.removeEventListener('dblclick', onDbClick)
  }, [])

  return (
    <div className="HoldingScreen">
      <h1>{state.value.holding}</h1>
    </div>
  )
}


export default App
