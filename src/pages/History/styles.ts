import styled from 'styled-components'

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 0rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${(props) => props.theme.primary};
    }

    @media (width >= 48rem) {
        padding: 3.5rem;
    }
`

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin: 2rem 0;

    table {
        width: 100%;
        border-collapse: collapse;
        /* min-width: 600px; */

        th {
            background-color: ${(props) => props.theme.background};
            padding: 1rem;
            text-align: left;
            color: ${(props) => props.theme.text};
            /* font-size: 0.875rem; */
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td {
            background-color: ${(props) => props.theme.buttonBg};
            border-top: 4px solid transparent;
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-right: 1.5rem;
            }
        }
    }
`
