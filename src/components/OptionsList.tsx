"use client";

interface DefiOption {
  name: string;
  apy: number;
  tvl: number;
  activeWallets: number;
  chain: string;
  riskLevel: "low" | "medium" | "high";
  minLockPeriod: number;
}

interface OptionsListProps {
  options: DefiOption[];
}

export default function OptionsList({ options }: OptionsListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Available Options:</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-4 p-2 border rounded">
            <h3 className="font-bold">{option.name}</h3>
            <p>APY: {option.apy}%</p>
            <p>TVL: ${option.tvl.toLocaleString()}</p>
            <p>Active Wallets: {option.activeWallets.toLocaleString()}</p>
            <p>Chain: {option.chain}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
