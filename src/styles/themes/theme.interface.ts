import { PomodoroPhase } from '../../contexts/PomodoroContext/pomodoro.interface'
import { focusTheme, longBreakTheme, shortBreakTheme } from './default'

export const ThemeColors = {
    [PomodoroPhase.FOCUS_TIME]: focusTheme,
    [PomodoroPhase.SHORT_BREAK]: shortBreakTheme,
    [PomodoroPhase.LONG_BREAK]: longBreakTheme,
} as const

export type ThemeVariant = keyof typeof ThemeColors
