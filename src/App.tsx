import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { PomodoroContextProvider } from './contexts/PomodoroContext';
import { useState } from 'react';
import { PomodoroMode } from './contexts/PomodoroContext/pomodoro.interface';
import { ThemeColors } from './styles/themes/theme.interface';

function App() {
    const [theme, setTheme] = useState(defaultTheme);

    const changeTheme = (theme: PomodoroMode) => {
        setTheme(ThemeColors[theme]);
    }
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <PomodoroContextProvider changeTheme={changeTheme}>
                    <Router />
                </PomodoroContextProvider>
                <GlobalStyle />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
