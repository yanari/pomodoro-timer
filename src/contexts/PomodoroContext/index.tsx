import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { PomodoroMode, PomodoroSection } from './pomodoro.interface'
import { ThemeVariant } from '../../styles/themes/theme.interface'
import { pomodoroReducer } from '../../reducers/reducer'
import { Actions } from '../../reducers/actions'

const LOCAL_STORAGE_KEY = '@concentratimer:pomodoro-state-1.0.0'

interface PomodoroContextType {
    phase: PomodoroMode
    pomodoroSections: PomodoroSection[]
    isRunning: boolean
    timeLeft: number
    pomodoroCount: number
    skipCurrent: () => void
    resetTimer: () => void
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>
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

interface PomodoroContextProviderProps {
    children: ReactNode
    changeTheme: (theme: ThemeVariant) => void
}

export function PomodoroContextProvider({
    children,
    changeTheme,
}: PomodoroContextProviderProps) {
    const {
        focusDuration,
        longBreakDuration,
        pomodorosBeforeLongBreak,
        shortBreakDuration,
    } = DEFAULT_SETTINGS

    const [timeLeft, setTimeLeft] = useState<number>(focusDuration)

    const [pomodoroState, dispatch] = useReducer(
        pomodoroReducer,
        {
            isRunning: false,
            pomodoroSections: [],
            currentSectionStartedAt: null,
            phase: PomodoroMode.FOCUS_TIME,
            pomodoroCount: 0,
        },
        () => {
            // disparada assim que o reducer é criado
            const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }
        }
    )

    useEffect(() => {
        const stateJSON = JSON.stringify(pomodoroState)

        localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
    }, [pomodoroState])

    const { isRunning, phase, pomodoroCount, pomodoroSections } = pomodoroState

    useEffect(() => {
        if (timeLeft === 0) {
            skipCurrent()
        }
    }, [timeLeft])

    const startTimer = () => {
        dispatch({ type: Actions.START_TIMER })
    }

    const finishFocusTime = () => {
        const isLongBreak = (pomodoroCount + 1) % pomodorosBeforeLongBreak === 0

        dispatch({ type: Actions.FINISH_FOCUS_TIME, payload: { isLongBreak } })

        changeTheme(
            isLongBreak ? PomodoroMode.LONG_BREAK : PomodoroMode.SHORT_BREAK
        )
        setTimeLeft(isLongBreak ? longBreakDuration : shortBreakDuration)
    }

    const finishBreakTime = () => {
        dispatch({ type: Actions.FINISH_BREAK_TIME })

        changeTheme(PomodoroMode.FOCUS_TIME)
        setTimeLeft(DEFAULT_SETTINGS.focusDuration)
    }

    const skipCurrent = () => {
        if (phase === PomodoroMode.FOCUS_TIME) {
            finishFocusTime()
        } else {
            finishBreakTime()
        }
    }

    const resetTimer = () => {
        dispatch({ type: Actions.RESET_TIMER })

        changeTheme(PomodoroMode.FOCUS_TIME)
        setTimeLeft(focusDuration)
    }

    return (
        <PomodoroContext.Provider
            value={{
                phase,
                pomodoroSections,
                isRunning,
                timeLeft,
                pomodoroCount,
                setTimeLeft,
                resetTimer,
                startTimer,
                skipCurrent,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}
