import styled from 'styled-components'

export const RootContainer = styled.div`
    background: ${(props) => props.theme.foreground};
    width: 100vw;
    height: 100vh;
`

export const LayoutContainer = styled.div`
    max-width: 74rem;
    margin: auto;
    height: calc(100vh - 10rem);
    padding: 5rem 2.5rem;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
`
