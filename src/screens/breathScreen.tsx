import { useContext } from 'react'
import { AppContext } from '../machine/context'

export const BreathScreen = () => {
  const [state, send] = useContext(AppContext)

  return (
    <div className="StartScreen h-screen flex justify-center items-center flex-col">
      <h1 className='mb-12 uppercase font-black'>Breath</h1>
      <div className="relative aspect-square w-60 h-60  flex items-center justify-center">
        <div
          className={`bg-orange aspect-square left-0 right-0 top-0 bottom-0 absolute rounded-full transition-transform ${
            state.value.breathing === 'inhale' ? 'scale-50' : 'scale-100'
          }`}
        ></div>
        <div
          className={`bg-brown aspect-square absolute left-10 right-10 top-10 bottom-10 rounded-full delay-100 transition-transform ${
            state.value.breathing === 'inhale' ? 'scale-50' : 'scale-100'
          }`}
        ></div>

        <div className="absolute font-black shadow-dark-green drop-shadow-md text-white text-5xl">
          {state.context.breaths} / {state.context.maxBreaths}
        </div>
      </div>
    </div>
  )
}
