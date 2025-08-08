'use client';
import {
  AlchemyAccountProvider,
  createConfig,
  cookieStorage,
} from '@account-kit/react';
import { sepolia, alchemy } from '@account-kit/infra';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig(
  {
    transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    chain: sepolia,
    policyId: process.env.NEXT_PUBLIC_GAS_POLICY_ID,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
  },
  {
    auth: {
      sections: [
        [{ type: 'email' }],
        [
          { type: 'passkey' },
          { type: 'social', authProviderId: 'google', mode: 'popup' },
        ],
      ],
      addPasskeyOnSignup: true,
    },
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <AlchemyAccountProvider config={config} queryClient={qc}>
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
