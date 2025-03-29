import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { PomodoroContextProvider } from './contexts/PomodoroContext'
import { useState } from 'react'
import { PomodoroMode } from './contexts/PomodoroContext/pomodoro.interface'
import { ThemeColors } from './styles/themes/theme.interface'
import { SoundContextProvider } from './contexts/SoundContext'

function App() {
    const [theme, setTheme] = useState(defaultTheme)

    const changeTheme = (theme: PomodoroMode) => {
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
