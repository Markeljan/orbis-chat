'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { polygonMumbai, polygon } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

import { TooltipProvider } from '@/components/ui/tooltip'



const { publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai, polygon],
    [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
        new InjectedConnector({
            options: {
                shimDisconnect: false,
            },
        }),
    ],
});

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props} >
            <WagmiConfig config={config}>
                    <TooltipProvider>{children}</TooltipProvider>
            </WagmiConfig>
        </NextThemesProvider>
    )
}