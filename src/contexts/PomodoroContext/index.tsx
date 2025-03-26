import { createContext, ReactNode, useContext, useState } from 'react'
import { PomodoroMode } from './pomodoro.interface'
import { ThemeVariant } from '../../styles/themes/theme.interface'

interface PomodoroContextType {
    phase: PomodoroMode
    isRunning: boolean
    timeLeft: number
    pomodoroCount: number
    skipCurrent: () => void
    startTimer: () => void
    resetTimer: () => void
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>
}

export const PomodoroContext = createContext({} as PomodoroContextType)

export function usePomodoroContext() {
    return useContext(PomodoroContext)
}

const DEFAULT_SETTINGS = {
    focusDuration: 25 * 60,
    longBreakDuration: 15 * 60,
    shortBreakDuration: 5 * 60,
    pomodorosBeforeLongBreak: 4,
}

interface PomodoroContextProviderProps {
    children: ReactNode,
    changeTheme: (theme: ThemeVariant) => void
}

export function PomodoroContextProvider({
    children,
    changeTheme
}: PomodoroContextProviderProps) {
    const {
        focusDuration,
        longBreakDuration,
        pomodorosBeforeLongBreak,
        shortBreakDuration,
    } = DEFAULT_SETTINGS

    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState<number>(focusDuration)
    const [phase, setPhase] = useState<PomodoroMode>(PomodoroMode.FOCUS_TIME)
    const [pomodoroCount, setPomodoroCount] = useState<number>(0)

    const startTimer = () => {
        setIsRunning(true)
    }

    const finishFocusTime = () => {
        const isLongBreak = (pomodoroCount + 1) % pomodorosBeforeLongBreak === 0

        setPomodoroCount((state) => state + 1)
        changeTheme(isLongBreak ? PomodoroMode.LONG_BREAK : PomodoroMode.SHORT_BREAK)
        setPhase(
            isLongBreak ? PomodoroMode.LONG_BREAK : PomodoroMode.SHORT_BREAK
        )
        setTimeLeft(isLongBreak ? longBreakDuration : shortBreakDuration)
    }

    const finishBreakTime = () => {
        changeTheme(PomodoroMode.FOCUS_TIME);
        setPhase(PomodoroMode.FOCUS_TIME)
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
        setIsRunning(false);
        changeTheme(PomodoroMode.FOCUS_TIME);
        setPhase(PomodoroMode.FOCUS_TIME)
        setTimeLeft(focusDuration)
        setPomodoroCount(0)
    }

    return (
        <PomodoroContext.Provider
            value={{
                phase,
                isRunning,
                timeLeft,
                skipCurrent,
                startTimer,
                setTimeLeft,
                resetTimer,
                pomodoroCount
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}
