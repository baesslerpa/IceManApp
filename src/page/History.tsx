import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button/Button'
import { ButtonWrapper } from '../components/Button/ButtonWrapper'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function History() {
  const [rounds, setRounds] = useLocalStorage('rounds', [])
  const navigate = useNavigate()

  function clearHistory() {
    setRounds([])
  }

  return (
    <div className="History h-screen flex justify-center items-center flex-col">
      <h1 className="mb-12">History</h1>
      <ButtonWrapper>
        {rounds.length > 0 && <Button onClick={clearHistory}>Clear History</Button>}
        <Button onClick={() => navigate('/')}>Back</Button>
      </ButtonWrapper>

      {rounds.length > 0 ? (
        <ul className=" h-1/4 overflow-scroll">
          {rounds.map((round, index) => (
            <li key={index}>
              {round.minutes} : {round.seconds}
            </li>
          ))}
        </ul>
      ) : <p className='mt-12'>History is empty</p>}
    </div>
  )
}
