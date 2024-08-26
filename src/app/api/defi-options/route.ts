// src/app/api/defi-options/route.ts

import { NextResponse } from 'next/server';

async function fetchLiveData() {
  // This is where you'd make actual API calls to DeFi protocols
  // For now, we'll return mock data
  return [
    { name: 'Aave USDC', apy: 3.5, tvl: 1000000000, activeWallets: 50000, chain: 'Ethereum', riskLevel: 'low', minLockPeriod: 0 },
    { name: 'Compound USDC', apy: 3.2, tvl: 800000000, activeWallets: 40000, chain: 'Ethereum', riskLevel: 'low', minLockPeriod: 0 },
    { name: 'Curve USDC Pool', apy: 4.1, tvl: 500000000, activeWallets: 30000, chain: 'Ethereum', riskLevel: 'medium', minLockPeriod: 7 },
    // Add more options here
  ];
}

export async function GET() {
  const liveData = await fetchLiveData();
  return NextResponse.json(liveData);
}