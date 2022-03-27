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
    console.log('timerSeconds', seconds)
  }, [])

  return <div>{seconds}</div>
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
    <div className="HoldingScreen h-screen flex justify-center items-center flex-col">
      {state.value.holding == 'hold' && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center mb-9 text-dark-green leading-16 ">
            Doubletap <br /> to continue
          </h2>

          <div className="bg-white rounded-full w-60 h-60 flex items-center justify-center flex-col">
            <div className="mb-3 font-black text-xl tracking-wide">
              {state.value.holding.toUpperCase()}
            </div>

            <div>
              <strong className="font-black shadow-dark-green drop-shadow-md text-orange text-5xl">
                {padNumber(minutes)}:{padNumber(seconds)}
              </strong>
            </div>
          </div>
        </div>
      )}

      {state.value.holding == 'retention' && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center mb-9 text-dark-green leading-16 ">
            Take a breath
          </h2>

          <div className="bg-white rounded-full w-60 h-60 flex items-center justify-center flex-col">
            <div className="mb-3 font-black text-xl tracking-wide">
              {state.value.holding.toUpperCase()}
            </div>

            <div>
              <strong className="font-black shadow-dark-green drop-shadow-md text-eagle-green text-5xl">
                <CountDown />
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
