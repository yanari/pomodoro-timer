import { styled } from 'styled-components'

export const HomeContainer = styled.main`
    flex: 1;

    display: flex;
    gap: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /* form {
        display: flex;
        flex-direction: column;
        align-items: center;
    } */
`

export const StatusPomodoroContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

export const ControlButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 24rem;
`

interface ControlButtonProps {
    variant: keyof typeof variants
}

const variants = {
    primary: { color: 'gray-300', background: 'green-500', hover: 'green-700' },
    secondary: {
        color: 'green-500',
        background: 'gray-200',
        hover: 'gray-300',
    },
} as const

export const ControlButton = styled.button<ControlButtonProps>`
    background: ${(props) => props.theme[variants[props.variant].background]};
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme[variants[props.variant].color]};

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: ${(props) => props.theme[variants[props.variant].hover]};
    }
`
