import { useContext, useEffect } from "react"
import { AppContext } from "../machine/context"


export const HoldingScreen = () => {
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