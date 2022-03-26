import { useContext } from "react"
import { AppContext } from "../machine/context"

export const BreathScreen = () => {

    const [state, send] = useContext(AppContext)
  
    return (
      <div className="StartScreen">
        <h1>Breath {state.context.breaths} / {state.context.maxBreaths} </h1>
      </div>
    )
  }