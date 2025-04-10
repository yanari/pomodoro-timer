export const defaultTheme = {
    buttonBg: '#0003',
    buttonSelectedBg: '#0007',
    border: '#ffffff1a',
    white: '#ccc',
    countdownBg: '#212121',
    textTimer: '#E1E1E1',
    background: '#121212',
    primary: '#b91c1c',
    text: '#FFFFFF',
    foreground:
        'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.10) 0%, transparent 70%)',
}

export const shortBreakTheme = {
    ...defaultTheme,
    primary: '#059669', // Green for relaxation,
    foreground:
        'radial-gradient(circle at 50% 50%, rgba(5, 150, 105, 0.10) 0%, transparent 70%)',
}

export const longBreakTheme = {
    ...defaultTheme,
    primary: '#2563eb', // Blue for deeper relaxation
    foreground:
        'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
}

export const focusTheme = {
    ...defaultTheme,
    primary: '#b91c1c', //  red for focus mode
    foreground:
        'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.10) 0%, transparent 70%)',
}

// OLD COLORS:

// white: '#FFF',

// 'gray-100': '#E1E1E6',
// 'gray-300': '#C4C4CC',
// 'gray-400': '#8D8D99',
// 'gray-500': '#7C7C8A',
// 'gray-600': '#323238',
// 'gray-700': '#29292E',
// 'gray-800': '#202024',
// 'gray-900': '#121214',

// 'green-300': '#00B37E',
// 'green-500': '#00875F',
// 'green-700': '#015F43',

// 'red-500': '#AB222E',
// 'red-700': '#7A1921',

// 'yellow-500': '#FBA94C',
