import { produce } from 'immer'
import { PomodoroMode } from '../contexts/PomodoroContext/pomodoro.interface'
import { Actions } from './actions'

interface PomodoroState {
    isRunning: boolean
    phase: PomodoroMode
    pomodoroCount: number
}

interface PomodoroPayload {
    isLongBreak?: boolean
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
            })
        case Actions.FINISH_BREAK_TIME:
            return produce(state, (draft) => {
                draft.phase = PomodoroMode.FOCUS_TIME
            })
        case Actions.FINISH_FOCUS_TIME:
            return produce(state, (draft) => {
                const isLongBreak = action?.payload?.isLongBreak
                draft.phase = isLongBreak
                    ? PomodoroMode.LONG_BREAK
                    : PomodoroMode.SHORT_BREAK
                draft.pomodoroCount++
            })
        case Actions.RESET_TIMER:
            return produce(state, (draft) => {
                draft.isRunning = false
                draft.phase = PomodoroMode.FOCUS_TIME
                draft.pomodoroCount = 0
            })
        default:
            return state
    }
}
