import { styled } from 'styled-components'

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 8rem;
    line-height: 8rem;
    color: ${(props) => props.theme.textTimer};

    display: flex;

    span {
        filter: brightness(80%);
        padding: 0;
        border-radius: 8px;

        @media (width >= 48rem) {
            padding: 2rem 0.5rem;
        }
    }

    @media (width >= 48rem) {
        font-size: 10rem;
    }
`

export const Separator = styled.div`
    padding: 0;
    color: ${(props) => props.theme.primary};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;

    @media (width >= 48rem) {
        padding: 2rem 0;
    }
`
