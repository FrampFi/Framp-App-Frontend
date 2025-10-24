'use client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { useEffect, useState } from 'react';

export default function DynamicAuthProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const environmentId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!environmentId) {
        throw new Error('NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID is required');
    }

    if (!mounted) return null; // ✅ no rendering during SSR

    return (
        <DynamicContextProvider
            settings={{
                environmentId,
                walletConnectors: [SolanaWalletConnectors],
            }}
        >
            {children}
        </DynamicContextProvider>
    );
}
