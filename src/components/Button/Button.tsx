import { FunctionComponent } from 'react'

type ButtonProps = {
  onClick?: () => void
  className?: string
}
export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  className,
}) => (
  <button
    className={`button inline-flex uppercase rounded-full  bg-eagle-green text-frost font-semibold py-3 px-6 shadow-lg cursor-pointer hover:bg-dark-green transition ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)
