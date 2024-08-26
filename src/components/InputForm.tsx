"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react'

interface UserInput {
  amount: number;
  riskAppetite: 'low' | 'medium' | 'high';
  lockPeriod: number;
}

interface InputFormProps {
  onInputChange: (input: UserInput) => void;
}

export default function InputForm({ onInputChange }: InputFormProps) {
  const [amount, setAmount] = useState<number>(0)
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('low')
  const [lockPeriod, setLockPeriod] = useState<number>(30)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onInputChange({ amount, riskAppetite, lockPeriod })
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const handleRiskAppetiteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRiskAppetite(e.target.value as 'low' | 'medium' | 'high')
  }

  const handleLockPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLockPeriod(Number(e.target.value))
  }

  const inputStyle = "border p-1 text-black w-full"

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="amount" className="block text-white">USDC Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="riskAppetite" className="block text-white">Risk Appetite:</label>
        <select
          id="riskAppetite"
          value={riskAppetite}
          onChange={handleRiskAppetiteChange}
          className={inputStyle}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="lockPeriod" className="block text-white">Lock Period (days):</label>
        <input
          type="number"
          id="lockPeriod"
          value={lockPeriod}
          onChange={handleLockPeriodChange}
          className={inputStyle}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Find Options
      </button>
    </form>
  )
}