import React, { FunctionComponent } from 'react'

export const ButtonWrapper: FunctionComponent = ({ children }) => {
  return (
    <div className="flex items-center gap-5 flex-col sm:flex-row">
      {children}
    </div>
  )
}
