import { styled } from 'styled-components'

export const HomeContainer = styled.main`
    flex: 1;

    display: flex;
    gap: 4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const StatusPomodoroContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 40rem;
    justify-content: space-between;
`

export const PomodoroDisplayContainer = styled.div`
    font-size: 0.875rem;
    display: flex;
    gap: 0.5rem;
`

export const ControlButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 40rem;
`

export const ControlButton = styled.button`
    background: ${(props) => props.theme.primary};
    border: 0;
    padding: 1rem 2rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.text};

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        filter: brightness(75%);
    }
`
