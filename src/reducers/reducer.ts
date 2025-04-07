import { produce } from 'immer'
import {
    PomodoroPhase,
    PomodoroSection,
    Settings,
} from '../contexts/PomodoroContext/pomodoro.interface'
import { Actions } from './actions'

interface PomodoroState {
    sections: PomodoroSection[]
    currentSection: PomodoroSection | null
    currentPhase: PomodoroPhase
    currentPhaseStartedAt: Date | null
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
                draft.isRunning = true
                draft.currentPhaseStartedAt = now
                draft.currentSection = {
                    id: String(now.getTime()),
                    startedAt: now,
                    pomodoroCount: 0,
                }
            })
        case Actions.FINISH_BREAK_TIME:
            return produce(state, (draft) => {
                const now = new Date()
                draft.currentPhaseStartedAt = now
                const nextPhase = PomodoroPhase.FOCUS_TIME
                draft.currentPhase = nextPhase
            })
        case Actions.FINISH_FOCUS_TIME:
            return produce(state, (draft) => {
                const now = new Date()
                draft.currentPhaseStartedAt = now

                const isNextLongBreak = action?.payload?.isLongBreak
                draft.currentPhase = isNextLongBreak
                    ? PomodoroPhase.LONG_BREAK
                    : PomodoroPhase.SHORT_BREAK

                if (draft.currentSection) {
                    draft.currentSection.pomodoroCount++
                }
            })
        case Actions.RESET_TIMER:
            return produce(state, (draft) => {
                const { currentSection } = draft
                if (currentSection && currentSection.pomodoroCount > 0) {
                    const { id, pomodoroCount, startedAt } = currentSection
                    draft.sections.push({
                        id,
                        pomodoroCount,
                        startedAt,
                    })
                }
                draft.currentSection = null
                draft.isRunning = false
                draft.currentPhaseStartedAt = null
                draft.currentPhase = PomodoroPhase.FOCUS_TIME
            })
        default:
            return state
    }
}
