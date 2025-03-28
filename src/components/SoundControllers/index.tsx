import {
    Barcode,
    Brain,
    Coffee,
    SpeakerHigh,
    SpeakerSlash,
    VinylRecord,
} from '@phosphor-icons/react'
import {
    SoundControllerButton,
    SoundControllerContainer,
    SoundControllerContent,
    SoundControllerMuteButton,
    SoundControllerTitle,
} from './styles'
import { useAudio } from '../../hooks/useAudio'
import { useState } from 'react'

const noises = [
    { label: 'Pink Noise', sound: 'audio/pink.mp3', icon: <Brain size={24} /> },
    {
        label: 'Brown Noise',
        sound: 'audio/brown.mp3',
        icon: <Barcode size={24} />,
    },
    {
        label: 'Coffee Shop',
        sound: 'audio/coffee.mp3',
        icon: <Coffee size={24} />,
    },
    // {
    //     label: 'Lo-Fi',
    //     sound: 'audio/brown.mp3',
    //     icon: <VinylRecord size={24} />,
    // },
]

export function SoundControllers() {
    const [noiseAsset, setNoiseAsset] = useState<string>('audio/pink.mp3')
    const { isPlaying, togglePlaying, toggleAudioSrc } = useAudio(noiseAsset)

    const handleChangeNoise = (value: string) => {
        setNoiseAsset(value)
        toggleAudioSrc()
        if (!isPlaying) {
            togglePlaying()
        }
    }

    return (
        <SoundControllerContainer>
            <SoundControllerTitle>
                <span>Ambient Sound</span>
                <SoundControllerMuteButton onClick={togglePlaying}>
                    {isPlaying ? <SpeakerSlash /> : <SpeakerHigh />}
                </SoundControllerMuteButton>
            </SoundControllerTitle>
            <SoundControllerContent>
                {noises.map((noise) => {
                    return (
                        <SoundControllerButton
                            key={noise.label}
                            onClick={() => handleChangeNoise(noise.sound)}
                        >
                            {noise.icon}
                            <span>{noise.label}</span>
                        </SoundControllerButton>
                    )
                })}
            </SoundControllerContent>
        </SoundControllerContainer>
    )
}
