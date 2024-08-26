"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UserInput {
  amount: number;
  riskAppetite: 'low' | 'medium' | 'high';
  lockPeriod: number;
}

interface InputFormProps {
  onInputChange: (input: UserInput) => void;
}

export default function InputForm({ onInputChange }: InputFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('low');
  const [lockPeriod, setLockPeriod] = useState<number>(30);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInputChange({ amount, riskAppetite, lockPeriod });
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleRiskAppetiteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRiskAppetite(e.target.value as 'low' | 'medium' | 'high');
  };

  const handleLockPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLockPeriod(Number(e.target.value));
  };

  const inputStyle = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800";
  const labelStyle = "block mb-2 text-sm font-medium text-gray-200";
  const groupStyle = "mb-6";

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Investment Options</h2>
      <div className={groupStyle}>
        <label htmlFor="amount" className={labelStyle}>USDC Amount:</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className={`${inputStyle} pl-8`}
            placeholder="Enter amount"
          />
        </div>
      </div>
      <div className={groupStyle}>
        <label htmlFor="riskAppetite" className={labelStyle}>Risk Appetite:</label>
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
      <div className={groupStyle}>
        <label htmlFor="lockPeriod" className={labelStyle}>Lock Period (days):</label>
        <input
          type="number"
          id="lockPeriod"
          value={lockPeriod}
          onChange={handleLockPeriodChange}
          className={inputStyle}
          placeholder="Enter lock period"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Find Options
      </button>
    </form>
  );
}