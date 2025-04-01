export enum PomodoroMode {
    FOCUS_TIME = 'Focus Time',
    SHORT_BREAK = 'Short Break',
    LONG_BREAK = 'Long Break',
}

export interface PomodoroSection {
    startTime: Date
    completedPomodoros: number
}
