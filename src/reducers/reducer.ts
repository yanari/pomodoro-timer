import { produce } from 'immer'
import {
    PomodoroPhase,
    PomodoroSection,
    Settings,
} from '../contexts/PomodoroContext/pomodoro.interface'
import { Actions } from './actions'

interface PomodoroState {
    sections: PomodoroSection[]
    currentPhase: PomodoroPhase
    currentPhaseStartedAt: Date | null
    currentSectionStartedAt: Date | null
    settings: Settings
    isRunning: boolean
    amountSecondsPassed: 0
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
                const now = new Date()
                draft.sections.push({
                    id: String(now.getTime()),
                    startedAt: now,
                    pomodoroCount: 0,
                })
                draft.isRunning = true
                draft.currentPhaseStartedAt = now
                draft.currentSectionStartedAt = now
            })
        case Actions.FINISH_BREAK_TIME:
            return produce(state, (draft) => {
                const nextPhase = PomodoroPhase.FOCUS_TIME
                const now = new Date()
                draft.currentPhaseStartedAt = now
                draft.currentPhase = nextPhase
            })
        case Actions.FINISH_FOCUS_TIME:
            return produce(state, (draft) => {
                const isNextLongBreak = action?.payload?.isLongBreak
                const now = new Date()
                draft.currentPhaseStartedAt = now
                draft.currentPhase = isNextLongBreak
                    ? PomodoroPhase.LONG_BREAK
                    : PomodoroPhase.SHORT_BREAK
                const currentSection = draft.sections.find(
                    (section) =>
                        section.startedAt === draft.currentSectionStartedAt
                )
                if (currentSection) {
                    currentSection.pomodoroCount++
                }
            })
        case Actions.RESET_TIMER:
            return produce(state, (draft) => {
                draft.isRunning = false
                draft.currentPhaseStartedAt = null
                draft.currentSectionStartedAt = null
                draft.currentPhase = PomodoroPhase.FOCUS_TIME
            })
        default:
            return state
    }
}
