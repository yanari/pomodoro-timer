import {
    ControlButton,
    ControlButtonsContainer,
    HomeContainer,
    PomodoroDisplayContainer,
    StatusPomodoroContainer,
} from './styles'
import { Countdown } from './components/Countdown'
import { usePomodoroContext } from '../../contexts/PomodoroContext'
import { Tag } from '../../components/Tag'
import { HandPalm, Play, SkipForward } from '@phosphor-icons/react'
import { SoundControllers } from '../../components/SoundControllers'
import { useSoundContext } from '../../contexts/SoundContext'
import { PomodoroMode } from '../../contexts/PomodoroContext/pomodoro.interface'

export function Home() {
    const {
        phase,
        isRunning,
        pomodoroCount,
        startTimer,
        skipCurrent,
        resetTimer,
    } = usePomodoroContext()

    const { play, pause } = useSoundContext()

    const handleClickMainButton = () => {
        if (isRunning) {
            skipCurrent()
            if (phase === PomodoroMode.FOCUS_TIME) play()
            else pause()
        } else {
            startTimer()
        }
    }

    return (
        <HomeContainer>
            <StatusPomodoroContainer>
                <Tag as="h3">{phase}</Tag>
                <PomodoroDisplayContainer>
                    {pomodoroCount > 0 && (
                        <Tag>Completed Pomodoros: 🍅 x{pomodoroCount}</Tag>
                    )}
                </PomodoroDisplayContainer>
            </StatusPomodoroContainer>

            <Countdown />

            <ControlButtonsContainer>
                <ControlButton
                    $isPrimary
                    type="button"
                    onClick={handleClickMainButton}
                >
                    {isRunning ? <SkipForward size={24} /> : <Play size={24} />}
                    {isRunning ? 'Skip' : 'Start'}
                </ControlButton>
                <ControlButton type="button" onClick={resetTimer}>
                    <HandPalm size={24} />
                    Reset
                </ControlButton>
            </ControlButtonsContainer>

            <SoundControllers />
        </HomeContainer>
    )
}
