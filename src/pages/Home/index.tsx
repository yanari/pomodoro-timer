import {
    ControlButton,
    ControlButtonsContainer,
    HomeContainer,
    PomodoroDisplayContainer,
    StatusPomodoroContainer,
} from './styles'
import { Countdown } from './components/Countdown'
import { HandPalm, Play, SkipForward } from 'phosphor-react'
import { usePomodoroContext } from '../../contexts/PomodoroContext'

export function Home() {
    const {
        phase,
        isRunning,
        pomodoroCount,
        skipCurrent,
        startTimer,
        resetTimer,
    } = usePomodoroContext()

    return (
        <HomeContainer>
            <StatusPomodoroContainer>
                <h1>{phase}</h1>
                <PomodoroDisplayContainer>
                    {pomodoroCount > 0 && (
                        <>Completed Pomodoros: 🍅 x{pomodoroCount}</>
                    )}
                </PomodoroDisplayContainer>
            </StatusPomodoroContainer>

            <Countdown />

            <ControlButtonsContainer>
                <ControlButton
                    type="button"
                    onClick={isRunning ? skipCurrent : startTimer}
                >
                    {isRunning ? <SkipForward size={24} /> : <Play size={24} />}
                    {isRunning ? 'Skip' : 'Start'}
                </ControlButton>
                <ControlButton
                    type="button"
                    onClick={resetTimer}
                >
                    <HandPalm size={24} />
                    Reset
                </ControlButton>
            </ControlButtonsContainer>
        </HomeContainer>
    )
}
