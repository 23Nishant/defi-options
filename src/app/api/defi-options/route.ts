import { NextResponse } from 'next/server';

// Mock data - replace this with actual API calls to DeFi protocols
const mockData = [
  { name: 'Aave USDC', apy: 3.5, tvl: 1000000000, activeWallets: 50000, chain: 'Ethereum', riskLevel: 'low', minLockPeriod: 0 },
  { name: 'Compound USDC', apy: 3.2, tvl: 800000000, activeWallets: 40000, chain: 'Ethereum', riskLevel: 'low', minLockPeriod: 0 },
  { name: 'Curve USDC Pool', apy: 4.1, tvl: 500000000, activeWallets: 30000, chain: 'Ethereum', riskLevel: 'medium', minLockPeriod: 7 },
  // Add more mock data here
];

export async function GET() {
  return NextResponse.json(mockData);
}