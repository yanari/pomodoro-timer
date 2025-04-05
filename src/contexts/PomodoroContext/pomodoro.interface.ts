export enum PomodoroPhase {
    FOCUS_TIME = 'Focus Time',
    SHORT_BREAK = 'Short Break',
    LONG_BREAK = 'Long Break',
}

export interface PomodoroSection {
    id: string
    pomodoroCount: number
    startedAt: Date
}

export interface Settings {
    focusDuration: number
    longBreakDuration: number
    shortBreakDuration: number
    pomodorosBeforeLongBreak: number
}
