import {
    ControlButton,
    ControlButtonsContainer,
    HomeContainer,
    StatusPomodoroContainer,
} from './styles'
import { Countdown } from './components/Countdown'
import { HandPalm, Play, SkipForward } from 'phosphor-react'
import { usePomodoroContext } from '../../contexts/PomodoroContext'

export function Home() {
    const {
        phase,
        isRunning,
        skipCurrent,
        startTimer,
        resetTimer,
        pomodoroCount,
    } = usePomodoroContext()

    return (
        <HomeContainer>
            <StatusPomodoroContainer>
                {phase}
                <span>Completed Pomodoros: {pomodoroCount}</span>
            </StatusPomodoroContainer>

            <Countdown />

            <ControlButtonsContainer>
                <ControlButton
                    variant="primary"
                    type="button"
                    onClick={isRunning ? skipCurrent : startTimer}
                >
                    {isRunning ? <SkipForward size={24} /> : <Play size={24} />}
                    {isRunning ? 'Skip' : 'Start'}
                </ControlButton>
                <ControlButton
                    variant="secondary"
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
