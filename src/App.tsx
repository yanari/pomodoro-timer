import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { PomodoroContextProvider } from './contexts/PomodoroContext'
import { useState } from 'react'
import { PomodoroPhase } from './contexts/PomodoroContext/pomodoro.interface'
import { ThemeColors } from './styles/themes/theme.interface'
import { SoundContextProvider } from './contexts/SoundContext'
import { LOCAL_STORAGE_KEY } from './shared/constants'

function App() {
    const [theme, setTheme] = useState(() => {
        const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedStateAsJSON) {
            const stored = JSON.parse(storedStateAsJSON)
            const mode = stored.currentPhase as PomodoroPhase
            return ThemeColors[mode]
        }
        return defaultTheme
    })

    const changeTheme = (theme: PomodoroPhase) => {
        setTheme(ThemeColors[theme])
    }
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <PomodoroContextProvider changeTheme={changeTheme}>
                    <SoundContextProvider>
                        <Router />
                    </SoundContextProvider>
                </PomodoroContextProvider>
                <GlobalStyle />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
