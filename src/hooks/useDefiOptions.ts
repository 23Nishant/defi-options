// src/hooks/useDefiOptions.ts

import useSWR from 'swr';
import axios from 'axios';

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useDefiOptions(userInput: UserInput) {
  const { data, error } = useSWR<DefiOption[]>('/api/defi-options', fetcher);

  const processedOptions = data ? findBestOptions(data, userInput) : null;

  return {
    options: processedOptions,
    isLoading: !error && !data,
    error: error
  };
}

function findBestOptions(options: DefiOption[], userInput: UserInput): DefiOption[] {
  // Step 1: Filter options based on user input
  const filteredOptions = options.filter(option => 
    option.riskLevel <= userInput.riskAppetite &&
    option.minLockPeriod <= userInput.lockPeriod
  );

  // Step 2: Sort options based on a scoring system
  const scoredOptions = filteredOptions.map(option => ({
    ...option,
    score: calculateScore(option, userInput)
  }));

  // Step 3: Sort by score descending
  scoredOptions.sort((a, b) => b.score - a.score);

  // Step 4: Return top 5 options
  return scoredOptions.slice(0, 5).map(({ score, ...option }) => option);
}

function calculateScore(option: DefiOption, userInput: UserInput): number {
  // This is a simple scoring system. Adjust weights as needed.
  const apyWeight = 0.5;
  const tvlWeight = 0.2;
  const activeWalletsWeight = 0.2;
  const riskWeight = 0.1;

  const riskScore = option.riskLevel === 'low' ? 3 : option.riskLevel === 'medium' ? 2 : 1;
  const userRiskScore = userInput.riskAppetite === 'low' ? 1 : userInput.riskAppetite === 'medium' ? 2 : 3;

  return (
    option.apy * apyWeight +
    (option.tvl / 1e9) * tvlWeight + // Normalize TVL to billions
    (option.activeWallets / 1e5) * activeWalletsWeight + // Normalize active wallets to hundreds of thousands
    (riskScore / userRiskScore) * riskWeight
  );
}