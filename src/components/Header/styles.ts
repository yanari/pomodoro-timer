import styled from 'styled-components'

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    nav {
        height: 3rem;
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${(props) => props.theme.textTimer};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            &:hover {
                border-bottom: 3px solid ${(props) => props.theme.primary};
            }

            &.active {
                color: ${(props) => props.theme.primary};
            }
        }
    }
`
