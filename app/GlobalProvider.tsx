'use client'

import {ReactNode} from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

type GlobalProviderProps = {
    children: ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
})

export default function GlobalProvider({ children }: GlobalProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </NextThemesProvider>
    )
}