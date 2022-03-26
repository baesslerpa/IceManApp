import { useContext, useEffect } from 'react'
import { useStopwatch, useTimer } from 'react-timer-hook'
import { t } from 'xstate'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AppContext } from '../machine/context'

function padNumber(num: number) {
  return num < 10 ? '0' + num : num
}

function setStartTime(): Date {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 5)
  return time
}

const CountDown = () => {
  const { seconds } = useTimer({ expiryTimestamp: setStartTime() })
  useEffect(() => {
    console.log('timerSeconds', seconds);
  }, [])
    
  return (
    <span className="absolute font-black">
      {seconds}
    </span>
  )
}

export const HoldingScreen = () => {
  const [state, send] = useContext(AppContext)
  const [rounds, setRounds] = useLocalStorage('rounds', [])

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true })


  useEffect(() => {
    if (state.value.holding === 'hold') start()
    else pause()

    return () => {
      const newRounds = [...rounds, { minutes, seconds }]
      setRounds(newRounds)
      reset()
    }
  }, [state.value])

  useEffect(() => {
    const onDbClick = () => send('NEXT')
    window.addEventListener('dblclick', onDbClick)
    return () => window.removeEventListener('dblclick', onDbClick)
  }, [])

  return (
    <div className="HoldingScreen">
      {state.value.holding == 'hold' && (
        <div>
          <h1>
            {state.value.holding} {minutes}:{padNumber(seconds)}
          </h1>
        </div>
      )}

      {state.value.holding == 'retention' && (
        <div>
          <h1>
            {state.value.holding}aaa <CountDown />
          </h1>
        </div>
      )}
    </div>
  )
}
