"use client";

import { useState } from 'react'
import { useDefiOptions } from '../hooks/useDefiOptions'
import InputForm from './InputForm'
import OptionsList from './OptionsList'

interface UserInput {
  amount: number;
  riskAppetite: 'low' | 'medium' | 'high';
  lockPeriod: number;
}

export default function ClientPage() {
  const [userInput, setUserInput] = useState<UserInput>({
    amount: 0,
    riskAppetite: 'low' as const,
    lockPeriod: 30
  })

  const { options, isLoading, error } = useDefiOptions(userInput)

  const handleInputChange = (newInput: UserInput) => {
    setUserInput(newInput)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DeFi Options Finder</h1>
      <InputForm onInputChange={handleInputChange} />
      {isLoading && <p>Loading options...</p>}
      {error && <p>Error: {error.message}</p>}
      {options && <OptionsList options={options} />}
    </div>
  )
}