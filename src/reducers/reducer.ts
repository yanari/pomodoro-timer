import { produce } from 'immer'
import {
    PomodoroMode,
    PomodoroSection,
} from '../contexts/PomodoroContext/pomodoro.interface'
import { Actions } from './actions'

interface PomodoroState {
    isRunning: boolean
    currentSectionStartedAt: Date | null
    phaseStartedAt: Date | null
    phase: PomodoroMode
    pomodoroSections: PomodoroSection[]
    pomodoroCount: number
}

interface PomodoroPayload {
    isLongBreak?: boolean
    startedAt?: Date
}

interface PomodoroActions {
    type: Actions
    payload?: PomodoroPayload
}

export function pomodoroReducer(state: PomodoroState, action: PomodoroActions) {
    switch (action.type) {
        case Actions.START_TIMER:
            return produce(state, (draft) => {
                draft.isRunning = true
                draft.phaseStartedAt = new Date()
                draft.currentSectionStartedAt = new Date()
            })
        case Actions.FINISH_BREAK_TIME:
            return produce(state, (draft) => {
                draft.phaseStartedAt = new Date()
                draft.phase = PomodoroMode.FOCUS_TIME
            })
        case Actions.FINISH_FOCUS_TIME:
            return produce(state, (draft) => {
                const isLongBreak = action?.payload?.isLongBreak
                draft.phaseStartedAt = new Date()
                draft.phase = isLongBreak
                    ? PomodoroMode.LONG_BREAK
                    : PomodoroMode.SHORT_BREAK
                draft.pomodoroCount++
            })
        case Actions.RESET_TIMER:
            return produce(state, (draft) => {
                if (draft.pomodoroCount > 1) {
                    draft.pomodoroSections.push({
                        completedPomodoros: draft.pomodoroCount,
                        startTime: draft.currentSectionStartedAt!,
                    })
                }
                draft.isRunning = false
                draft.phaseStartedAt = null
                draft.currentSectionStartedAt = null
                draft.phase = PomodoroMode.FOCUS_TIME
                draft.pomodoroCount = 0
            })
        default:
            return state
    }
}
