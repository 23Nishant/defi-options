"use client";

import useSWR from 'swr'
import axios from 'axios'

// Define types for our data structures
interface UserInput {
  amount: number;
  riskAppetite: 'low' | 'medium' | 'high';
  lockPeriod: number;
}

interface DefiOption {
  name: string;
  apy: number;
  tvl: number;
  activeWallets: number;
  chain: string;
  riskLevel: 'low' | 'medium' | 'high';
  minLockPeriod: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useDefiOptions(userInput: UserInput) {
  const { data, error } = useSWR<DefiOption[]>('/api/defi-options', fetcher)

  const processedOptions = data ? processOptions(data, userInput) : null

  return {
    options: processedOptions,
    isLoading: !error && !data,
    error: error
  }
}

function processOptions(options: DefiOption[], userInput: UserInput): DefiOption[] {
  return options
    .filter((option) => {
      if (userInput.riskAppetite === 'low' && option.riskLevel !== 'low') return false
      if (userInput.lockPeriod < option.minLockPeriod) return false
      return true
    })
    .sort((a, b) => b.apy - a.apy)
    .slice(0, 10)
}