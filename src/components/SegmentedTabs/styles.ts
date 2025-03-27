import styled from 'styled-components'

export const SegmentedTabsContainer = styled.div`
    --radius: 8px;
    --border: 4px;
    --height: 48px;

    height: 3rem;
    display: grid;
    grid-auto-flow: column;
    background: ${(props) => props.theme.countdownBg};
    border-radius: 8px;
    grid-auto-columns: 1fr;
    position: relative;
    border: 5px solid ${(props) => props.theme.countdownBg};

    input,
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    &:has(:checked:nth-of-type(1)) {
        --active: 0;
    }
    &:has(:checked:nth-of-type(2)) {
        --active: 1;
    }
    &:has(:checked:nth-of-type(3)) {
        --active: 2;
    }
    &:has(:checked:nth-of-type(4)) {
        --active: 3;
    }

    & :checked + label {
        --highlight: 1;
    }

    &:has(input:nth-of-type(2)) {
        --count: 2;
    }
    &:has(input:nth-of-type(3)) {
        --count: 3;
    }
    &:has(input:nth-of-type(4)) {
        --count: 4;
    }

    label {
        padding: 0 1rem;
        cursor: pointer;
        text-align: center;
        height: 100%;
        display: grid;
        border-radius: 4px;
        place-items: center;
        color: ${(props) => props.theme.text};
        transition: background 0.25s ease, color 0.25s ease;
        z-index: 1;
    }

    &::after {
        pointer-events: none;
        content: '';
        width: calc(100% / var(--count));
        height: 100%;
        background: ${(props) => props.theme.primary};
        position: absolute;
        border-radius: 4px;
        translate: calc(var(--active, 0) * 100%);
        transition: translate 0.2s ease;
    }
`
