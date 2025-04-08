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

export const PomodoroDisplayLabel = styled.div`
    display: none;

    @media (width >= 48rem) {
        display: inline-block;
    }
`

export const ControlButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));

    gap: 1.5rem;
    max-width: 40rem;
`

interface ControlButtonProps {
    $isPrimary?: boolean
}

export const ControlButton = styled.button<ControlButtonProps>`
    background: ${(props) =>
        props.$isPrimary ? props.theme.primary : props.theme.buttonBg};
    border: 2px solid ${(props) => props.theme.primary};
    padding: 1rem 2rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) =>
        props.$isPrimary ? props.theme.text : props.theme.primary};

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
