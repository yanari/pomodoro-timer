import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { CyclesContextProvider } from './contexts/CyclesContext';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <CyclesContextProvider>
                    <Router />
                </CyclesContextProvider>
                <GlobalStyle />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
