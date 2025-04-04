import { useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { usePomodoroContext } from '../../../../contexts/PomodoroContext'
import { differenceInSeconds } from 'date-fns'
import { PomodoroMode } from '../../../../contexts/PomodoroContext/pomodoro.interface'

export function Countdown() {
    const {
        isRunning,
        amountSecondsPassed,
        setSecondsPassed,
        phaseStartedAt,
        phase,
        settings,
        skipCurrent,
    } = usePomodoroContext()

    const totalSeconds =
        phase === PomodoroMode.FOCUS_TIME
            ? settings.focusDuration
            : phase === PomodoroMode.LONG_BREAK
            ? settings.longBreakDuration
            : phase === PomodoroMode.SHORT_BREAK
            ? settings.shortBreakDuration
            : 0

    useEffect(() => {
        let interval: number
        if (isRunning && phaseStartedAt) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(
                    new Date(),
                    new Date(phaseStartedAt)
                )

                if (differenceSeconds >= totalSeconds) {
                    skipCurrent()
                    setSecondsPassed(totalSeconds)
                } else {
                    setSecondsPassed(differenceSeconds)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [totalSeconds, setSecondsPassed, skipCurrent])

    const currentSeconds = isRunning ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (isRunning) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, isRunning])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}
