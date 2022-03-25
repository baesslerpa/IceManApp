import { createContext } from 'react'
import { Context } from './machine'


export const AppContext = createContext<Context>({} as any)
