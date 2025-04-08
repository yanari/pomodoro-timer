import {
    ControlButton,
    ControlButtonsContainer,
    HomeContainer,
    PomodoroDisplayContainer,
    PomodoroDisplayLabel,
    StatusPomodoroContainer,
} from './styles'
import { Countdown } from './components/Countdown'
import { usePomodoroContext } from '../../contexts/PomodoroContext'
import { Tag } from '../../components/Tag'
import { HandPalm, Play, SkipForward } from '@phosphor-icons/react'
import { SoundControllers } from './components/SoundControllers'
import { useSoundContext } from '../../contexts/SoundContext'
import { useEffect } from 'react'
import { PomodoroPhase } from '../../contexts/PomodoroContext/pomodoro.interface'

export function Home() {
    const {
        currentPhase,
        isRunning,
        currentPomodoroCount,
        startTimer,
        skipCurrent,
        resetTimer,
    } = usePomodoroContext()

    const { play, pause } = useSoundContext()

    useEffect(() => {
        if (isRunning) {
            if (currentPhase === PomodoroPhase.FOCUS_TIME) play()
            else pause()
        }
    }, [currentPhase, isRunning])

    const handleClickMainButton = () => {
        if (isRunning) {
            skipCurrent()
        } else {
            startTimer()
        }
    }

    const stopCountdown = () => {
        pause()
        resetTimer()
    }

    return (
        <HomeContainer>
            <StatusPomodoroContainer>
                <Tag as="h3">{currentPhase}</Tag>
                <PomodoroDisplayContainer>
                    {currentPomodoroCount > 0 && (
                        <Tag>
                            <PomodoroDisplayLabel>
                                Completed Pomodoros:{' '}
                            </PomodoroDisplayLabel>
                            🍅 x{currentPomodoroCount}
                        </Tag>
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
                {isRunning && (
                    <ControlButton type="button" onClick={stopCountdown}>
                        <HandPalm size={24} />
                        Reset
                    </ControlButton>
                )}
            </ControlButtonsContainer>

            <SoundControllers />
        </HomeContainer>
    )
}
