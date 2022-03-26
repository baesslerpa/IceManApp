import { useMachine } from '@xstate/react'
import React, {
  useContext,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button/Button'
import { AppMachine } from '../machine'
import { AppContext } from '../machine/context'
import { BreathScreen } from '../screens/breathScreen'
import { HoldingScreen } from '../screens/holdingScreen'

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
  const navigate = useNavigate()
  const [state, send] = useContext(AppContext)
  return (
    <div className="StartScreen h-screen flex justify-center items-center flex-col">
      <h1 className="mb-8">Welcome to the app!</h1>
      <div className='flex items-center gap-5 flex-col sm:flex-row'>
        <Button onClick={() => send('NEXT')}>Meditate</Button>
        <div onClick={() => navigate('/settings')} className='w-full sm:w-auto text-brown bg-white rounded-full shadow-lg py-3 px-6 shadow-lg cursor-pointer'>Settings</div>
      </div>
    </div>
  )
}

export default App
