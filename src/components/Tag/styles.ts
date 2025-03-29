import { styled } from 'styled-components'

export const TagContainer = styled.div<{ $isBig: boolean }>`
    background-color: ${(props) => props.theme.buttonBg};
    border-radius: 9999px;
    border: 1px solid #ffffff1a;
    padding: ${(props) => (props.$isBig ? '0.5rem 1rem' : '0.25rem 0.75rem')};
`
