import React, { useContext } from 'react'
import { AppContext } from '../../machine/context'
import { Context } from '../../machine/machine'

function Stage() {
  const [state, send] = useContext<Context>(AppContext)
    
  return <div>Stage {state.value?.breathing || state.value}</div>
}

export default Stage
