import { PomodoroMode } from '../../contexts/PomodoroContext/pomodoro.interface'
import { focusTheme, longBreakTheme, shortBreakTheme } from './default'

export const ThemeColors = {
    [PomodoroMode.FOCUS_TIME]: focusTheme,
    [PomodoroMode.SHORT_BREAK]: shortBreakTheme,
    [PomodoroMode.LONG_BREAK]: longBreakTheme,
} as const

export type ThemeVariant = keyof typeof ThemeColors
