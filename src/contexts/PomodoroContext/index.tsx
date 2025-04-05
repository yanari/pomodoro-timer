import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { PomodoroPhase, PomodoroSection, Settings } from './pomodoro.interface'
import { ThemeVariant } from '../../styles/themes/theme.interface'
import { pomodoroReducer } from '../../reducers/reducer'
import { Actions } from '../../reducers/actions'
import { differenceInSeconds } from 'date-fns'
import { LOCAL_STORAGE_KEY } from '../../shared/constants'

const DEFAULT_SETTINGS = {
    // focusDuration: 25 * 60,
    // longBreakDuration: 15 * 60,
    // shortBreakDuration: 5 * 60,
    focusDuration: 25, // test
    longBreakDuration: 15, // test
    shortBreakDuration: 5, // test
    pomodorosBeforeLongBreak: 4,
}

interface PomodoroContextType {
    currentPhase: PomodoroPhase
    currentPhaseStartedAt: Date | null
    currentPomodoroCount: number
    sections: PomodoroSection[]
    settings: Settings
    isRunning: boolean
    amountSecondsPassed: number
    skipCurrent: () => void
    resetTimer: () => void
    setSecondsPassed: (seconds: number) => void
    startTimer: () => void
}

const initialState = {
    sections: [],
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
        currentSectionStartedAt,
        sections,
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

    const currentSection = sections.find(
        (section) => section.startedAt === currentSectionStartedAt
    )

    const finishFocusTime = () => {
        if (currentSection) {
            const isLongBreak =
                (currentSection.pomodoroCount + 1) %
                    settings.pomodorosBeforeLongBreak ===
                0

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

    return (
        <PomodoroContext.Provider
            value={{
                currentPhase,
                currentPhaseStartedAt,
                currentPomodoroCount: currentSection
                    ? currentSection.pomodoroCount
                    : 0,
                isRunning,
                amountSecondsPassed,
                sections,
                settings: DEFAULT_SETTINGS,
                setSecondsPassed,
                resetTimer,
                startTimer,
                skipCurrent,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}
