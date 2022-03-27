import React, { Children, FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button/Button'
import { ButtonWrapper } from '../components/Button/ButtonWrapper'
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
    console.log('onSubmitForm', e)

    e.preventDefault()
    setSettings({ ...settings, maxBreaths, interval })
    navigate('/')
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-center mb-12">Change your Settings</h1>

      <form onSubmit={onSubmitForm}>
        <InputWrap>
          <label className="font-medium mb-4 text-xl text-eagle-green">Max Breaths ({maxBreaths})</label>
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
          <label className="font-medium mb-4 text-xl text-eagle-green">Interval ({interval})</label>
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

        <div className='mt-6'>
        <ButtonWrapper>
          <Button>Save Settings</Button>
          <div
            onClick={() => navigate('/')}
            className="w-full inline-block text-center sm:w-auto text-brown bg-white rounded-full shadow-lg py-3 px-6 shadow-lg cursor-pointer"
          >
            Back
          </div>
        </ButtonWrapper>
        </div>
      </form>
    </div>
  )
}

const InputWrap: FunctionComponent = ({ children }) => (
  <div className="flex flex-col bg-white/20 mb-4 px-4 py-6 rounded-lg backdrop-blur-sm items-center text-center">{children}</div>
)
