import { useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { usePomodoroContext } from '../../../../contexts/PomodoroContext'
import { differenceInSeconds } from 'date-fns'

export function Countdown() {
    const {
        isRunning,
        amountSecondsPassed,
        setSecondsPassed,
        currentPhaseStartedAt,
        totalSeconds,
        skipCurrent,
    } = usePomodoroContext()

    useEffect(() => {
        let interval: number
        if (currentPhaseStartedAt) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(
                    new Date(),
                    new Date(currentPhaseStartedAt)
                )

                if (differenceSeconds > totalSeconds) {
                    setSecondsPassed(totalSeconds)
                    skipCurrent()
                } else {
                    setSecondsPassed(differenceSeconds)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [
        totalSeconds,
        setSecondsPassed,
        skipCurrent,
        currentPhaseStartedAt,
        isRunning,
    ])

    const currentSeconds = isRunning ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if (isRunning) {
            document.title = `${minutes}:${seconds}`
        }
        document.title = 'Pomodoro Timer'
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
