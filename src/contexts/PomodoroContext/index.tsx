import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { PomodoroPhase, PomodoroSection } from './pomodoro.interface'
import { ThemeVariant } from '../../styles/themes/theme.interface'
import { pomodoroReducer } from '../../reducers/reducer'
import { Actions } from '../../reducers/actions'
import { differenceInSeconds } from 'date-fns'
import { LOCAL_STORAGE_KEY } from '../../shared/constants'

const DEFAULT_SETTINGS = {
    focusDuration: 25 * 60,
    longBreakDuration: 15 * 60,
    shortBreakDuration: 5 * 60,
    // focusDuration: 3, // test
    // longBreakDuration: 3, // test
    // shortBreakDuration: 3, // test
    pomodorosBeforeLongBreak: 4,
}

interface PomodoroContextType {
    currentPhase: PomodoroPhase
    currentPhaseStartedAt: Date | null
    currentPomodoroCount: number
    totalSeconds: number
    currentSection: PomodoroSection | null
    sections: PomodoroSection[]
    hasSections: boolean
    isRunning: boolean
    amountSecondsPassed: number
    startTimer: () => void
    skipCurrent: () => void
    resetTimer: () => void
    setSecondsPassed: (seconds: number) => void
}

const initialState = {
    sections: [],
    currentSection: null,
    currentPhase: PomodoroPhase.FOCUS_TIME,
    currentPhaseStartedAt: null,
    settings: DEFAULT_SETTINGS,
    isRunning: false,
    amountSecondsPassed: 0,
}

export const PomodoroContext = createContext({} as PomodoroContextType)

export function usePomodoroContext() {
    return useContext(PomodoroContext)
}

interface PomodoroContextProviderProps {
    children: ReactNode
    changeTheme: (theme: ThemeVariant) => void
}

const initialStateHandler = () => {
    // disparada assim que o reducer é criado
    const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
    }
    return initialState
}

export function PomodoroContextProvider({
    children,
    changeTheme,
}: PomodoroContextProviderProps) {
    const [pomodoroState, dispatch] = useReducer(
        pomodoroReducer,
        initialState,
        initialStateHandler
    )

    useEffect(() => {
        // Save on local storage when state changes
        const stateJSON = JSON.stringify(pomodoroState)

        localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON)
    }, [pomodoroState])

    const {
        isRunning,
        currentPhaseStartedAt,
        sections,
        currentSection,
        currentPhase,
        settings,
    } = pomodoroState

    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(
        () => {
            if (isRunning && currentPhaseStartedAt) {
                return differenceInSeconds(
                    new Date(),
                    new Date(currentPhaseStartedAt)
                )
            }
            return 0
        }
    )

    const startTimer = () => {
        dispatch({ type: Actions.START_TIMER })
    }

    const finishFocusTime = () => {
        if (currentSection) {
            const { pomodoroCount } = currentSection
            const count = pomodoroCount + 1
            const { pomodorosBeforeLongBreak } = settings
            const isLongBreak = count % pomodorosBeforeLongBreak === 0

            dispatch({
                type: Actions.FINISH_FOCUS_TIME,
                payload: { isLongBreak },
            })

            changeTheme(
                isLongBreak
                    ? PomodoroPhase.LONG_BREAK
                    : PomodoroPhase.SHORT_BREAK
            )
        }
    }

    const finishBreakTime = () => {
        dispatch({ type: Actions.FINISH_BREAK_TIME })

        changeTheme(PomodoroPhase.FOCUS_TIME)
    }

    const skipCurrent = () => {
        setAmountsSecondsPassed(0)
        if (currentPhase === PomodoroPhase.FOCUS_TIME) {
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

        changeTheme(PomodoroPhase.FOCUS_TIME)
        setAmountsSecondsPassed(0)
    }

    const currentPomodoroCount = currentSection
        ? currentSection.pomodoroCount
        : 0

    const totalSeconds =
        currentPhase === PomodoroPhase.FOCUS_TIME
            ? settings.focusDuration
            : currentPhase === PomodoroPhase.LONG_BREAK
            ? settings.longBreakDuration
            : currentPhase === PomodoroPhase.SHORT_BREAK
            ? settings.shortBreakDuration
            : 0

    const hasSections = sections.length > 0

    return (
        <PomodoroContext.Provider
            value={{
                currentPhase,
                currentPhaseStartedAt,
                currentPomodoroCount,
                totalSeconds,
                currentSection,
                sections,
                hasSections,
                isRunning,
                amountSecondsPassed,
                startTimer,
                skipCurrent,
                resetTimer,
                setSecondsPassed,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}
