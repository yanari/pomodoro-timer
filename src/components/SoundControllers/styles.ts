import { styled } from 'styled-components'

export const SoundControllerContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const SoundControllerTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
`

export const SoundControllerBaseButton = styled.button`
    border-radius: 8px;

    &:not(:disabled):hover {
        cursor: pointer;
        background-color: #0006;
    }
`

export const SoundControllerMuteButton = styled(SoundControllerBaseButton)`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.primary};
`

export const SoundControllerContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`

interface SoundControllerButtonProps {
    $isSelected: boolean
}

export const SoundControllerButton = styled(
    SoundControllerBaseButton
)<SoundControllerButtonProps>`
    border: 1px solid
        ${(props) =>
            props.$isSelected ? props.theme.primary : props.theme.border};
    padding: 0.75rem;

    background-color: ${(props) =>
        props.$isSelected
            ? props.theme.buttonSelectedBg
            : props.theme.buttonBg};
    color: ${(props) => props.theme.text};
    border-radius: 8px;

    span {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.875rem;
    }

    &:hover {
        background-color: #0006;
    }
`
