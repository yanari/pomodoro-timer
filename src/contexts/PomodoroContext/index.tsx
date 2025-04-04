import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { PomodoroMode } from './pomodoro.interface'
import { ThemeVariant } from '../../styles/themes/theme.interface'
import { pomodoroReducer } from '../../reducers/reducer'
import { Actions } from '../../reducers/actions'
import { differenceInSeconds } from 'date-fns'
import { LOCAL_STORAGE_KEY } from '../../shared/constants'

interface Settings {
    focusDuration: number
    longBreakDuration: number
    shortBreakDuration: number
    pomodorosBeforeLongBreak: number
}

interface PomodoroContextType {
    phase: PomodoroMode
    settings: Settings
    phaseStartedAt: Date | null
    isRunning: boolean
    pomodoroCount: number
    amountSecondsPassed: number
    skipCurrent: () => void
    resetTimer: () => void
    setSecondsPassed: (seconds: number) => void
    startTimer: () => void
}

export const PomodoroContext = createContext({} as PomodoroContextType)

export function usePomodoroContext() {
    return useContext(PomodoroContext)
}

const DEFAULT_SETTINGS = {
    focusDuration: 25 * 60,
    longBreakDuration: 15 * 60,
    shortBreakDuration: 5 * 60,
    // focusDuration: 25, // test
    // longBreakDuration: 15, // test
    // shortBreakDuration: 5, // test
    pomodorosBeforeLongBreak: 4,
}

const initialState = {
    isRunning: false,
    currentSectionStartedAt: null,
    phase: PomodoroMode.FOCUS_TIME,
    pomodoroCount: 0,
}

interface PomodoroContextProviderProps {
    children: ReactNode
    changeTheme: (theme: ThemeVariant) => void
}

export function PomodoroContextProvider({
    children,
    changeTheme,
}: PomodoroContextProviderProps) {
    const { pomodorosBeforeLongBreak } = DEFAULT_SETTINGS

    const [pomodoroState, dispatch] = useReducer(
        pomodoroReducer,
        initialState,
        () => {
            // disparada assim que o reducer é criado
            const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }
            return initialState
        }
    )

    useEffect(() => {
        const stateJSON = JSON.stringify(pomodoroState)

        localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
    }, [pomodoroState])

    const { isRunning, phase, pomodoroCount, phaseStartedAt } = pomodoroState

    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(
        () => {
            if (isRunning && phaseStartedAt) {
                return differenceInSeconds(new Date(), new Date(phaseStartedAt))
            }
            return 0
        }
    )

    const startTimer = () => {
        dispatch({ type: Actions.START_TIMER })
    }

    const finishFocusTime = () => {
        const isLongBreak = (pomodoroCount + 1) % pomodorosBeforeLongBreak === 0

        dispatch({ type: Actions.FINISH_FOCUS_TIME, payload: { isLongBreak } })

        changeTheme(
            isLongBreak ? PomodoroMode.LONG_BREAK : PomodoroMode.SHORT_BREAK
        )
    }

    const finishBreakTime = () => {
        dispatch({ type: Actions.FINISH_BREAK_TIME })

        changeTheme(PomodoroMode.FOCUS_TIME)
    }

    const skipCurrent = () => {
        setAmountsSecondsPassed(0)
        if (phase === PomodoroMode.FOCUS_TIME) {
            finishFocusTime()
        } else {
            finishBreakTime()
        }
    }

    const setSecondsPassed = (seconds: number) => {
        setAmountsSecondsPassed(seconds)
    }

    const resetTimer = () => {
        dispatch({ type: Actions.RESET_TIMER })

        changeTheme(PomodoroMode.FOCUS_TIME)
        setAmountsSecondsPassed(0)
    }

    return (
        <PomodoroContext.Provider
            value={{
                phase,
                phaseStartedAt,
                isRunning,
                amountSecondsPassed,
                pomodoroCount,
                setSecondsPassed,
                resetTimer,
                startTimer,
                skipCurrent,
                settings: DEFAULT_SETTINGS,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}
