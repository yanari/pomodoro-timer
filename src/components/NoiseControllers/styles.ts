import styled from 'styled-components';

export const NoiseControllersContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const ToggleSoundButton = styled.button`
    background: transparent;
    border: 0;
    color: ${(props) => props.theme['gray-300']};
    cursor: pointer;
    padding: 1rem;
`;
