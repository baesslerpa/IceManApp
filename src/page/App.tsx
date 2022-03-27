import { useMachine } from '@xstate/react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button/Button'
import { ButtonWrapper } from '../components/Button/ButtonWrapper'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AppMachine } from '../machine'
import { AppContext } from '../machine/context'
import { BreathScreen } from '../screens/breathScreen'
import { HoldingScreen } from '../screens/holdingScreen'

const App = () => {
  const [settings] = useLocalStorage('settings', {})
  const [state, send] = useMachine(
    AppMachine(settings.maxBreaths, settings.interval),
  )

  useEffect(() => {
    console.log('App state:', state)
  }, [state])

  return (
    <AppContext.Provider value={[state, send]}>
      <div className="App">
        {state.value === 'idle' && <StartScreen />}
        {state.value !== 'idle' && <BackButton />}
        
        {//@ts-ignore
        state.value.breathing && <BreathScreen />}
        {//@ts-ignore
        state.value.holding && <HoldingScreen />}
      </div>
    </AppContext.Provider>
  )
}

const BackButton = () => {
  const [state, send] = useContext(AppContext)

  return (
    <div
      className="absolute aspect-square  bg-white shadow-md rounded-full w-10 h-10 font-bold text-dark-green flex items-center justify-center font-2xl top-5 right-5"
      onClick={() => send('CANCLE')}
    >
      X
    </div>
  )
}

const StartScreen = () => {
  const navigate = useNavigate()
  const [state, send] = useContext(AppContext)
  const [rounds, setRounds] = useLocalStorage('rounds', [])

  return (
    <div className="StartScreen h-screen flex justify-center items-center flex-col">
      <h1 className="mb-8 text-center drop-shadow-md">
        Start <br /> your Session
      </h1>
      <ButtonWrapper>
        <Button onClick={() => send('NEXT')}>Meditate</Button>
        <div
          onClick={() => navigate('/settings')}
          className="w-full text-center sm:w-auto text-brown bg-white rounded-full shadow-lg py-3 px-6 shadow-lg cursor-pointer"
        >
          Settings
        </div>
      </ButtonWrapper>
    </div>
  )
}

export default App
