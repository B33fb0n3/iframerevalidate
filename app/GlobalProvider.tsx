'use client'

import {ReactNode} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"

type GlobalProviderProps = {
    children: ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    )
}