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
import { Tag } from '../../components/Tag'

export function Home() {
    const { phase, isRunning, pomodoroCount, onClickMainButton, resetTimer } =
        usePomodoroContext()

    return (
        <HomeContainer>
            <StatusPomodoroContainer>
                <h1>{phase}</h1>
                <PomodoroDisplayContainer>
                    {pomodoroCount > 0 && (
                        <Tag>Completed Pomodoros: 🍅 x{pomodoroCount}</Tag>
                    )}
                </PomodoroDisplayContainer>
            </StatusPomodoroContainer>

            <Countdown />

            <ControlButtonsContainer>
                <ControlButton type="button" onClick={onClickMainButton}>
                    {isRunning ? <SkipForward size={24} /> : <Play size={24} />}
                    {isRunning ? 'Skip' : 'Start'}
                </ControlButton>
                <ControlButton type="button" onClick={resetTimer}>
                    <HandPalm size={24} />
                    Reset
                </ControlButton>
            </ControlButtonsContainer>
        </HomeContainer>
    )
}
