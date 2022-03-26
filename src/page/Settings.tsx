import React, { Children, FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button/Button'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Settings() {
  const [settings, setSettings] = useLocalStorage('settings', {
    maxBreaths: 10,
    interval: 0.4,
  })
  const navigate = useNavigate()
  const [maxBreaths, setMaxBreaths] = useState(settings.maxBreaths)
  const [interval, setInterval] = useState(settings.interval)

  function onSubmitForm(e: React.FormEvent) {
    e.preventDefault()
    setSettings({
      ...settings,
      maxBreaths,
      interval,
    })
    console.log(maxBreaths, interval)
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-center mb-12">Change your Settings</h1>

      <form onSubmit={onSubmitForm}>
        <InputWrap>
          <label>Max Breaths ({maxBreaths})</label>
          <input
            name="maxBreaths"
            type="range"
            min={1}
            max={50}
            value={maxBreaths}
            onChange={(e) => setMaxBreaths(e.target.value)}
          />
        </InputWrap>

        <InputWrap>
          <label className="mt-6">Interval ({interval})</label>
          <input
            name="interval"
            type="range"
            min={0.3}
            max={0.9}
            step={0.1}
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </InputWrap>

        <button>Save</button>
      </form>

      <Button onClick={() => navigate('/')}> Back </Button>
    </div>
  )
}

const InputWrap: FunctionComponent = ({ children }) => (
  <div className="flex flex-col items-center text-center">{children}</div>
)
