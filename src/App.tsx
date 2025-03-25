import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
// import { CyclesContextProvider } from './contexts/CyclesContext';
import { PomodoroContextProvider } from './contexts/PomodoroContext';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <PomodoroContextProvider>
                    <Router />
                </PomodoroContextProvider>
                <GlobalStyle />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
