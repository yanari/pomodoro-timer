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
    cursor: pointer;

    border-radius: 8px;

    &:hover {
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

export const SoundControllerButton = styled(SoundControllerBaseButton)`
    border: 1px solid #ffffff1a;
    padding: 0.5rem;
    background-color: ${(props) => props.theme.button};
    color: ${(props) => props.theme.text};
    border-radius: 8px;

    span {
        display: block;
        margin-top: 0.25rem;
    }

    &:hover {
        background-color: #0006;
    }
`
