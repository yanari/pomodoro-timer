import {
    Barcode,
    Brain,
    Coffee,
    SpeakerHigh,
    SpeakerSlash,
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
    const [noiseAsset, setNoiseAsset] = useState<string>('')
    const { isPlaying, togglePlaying, toggleAudioSrc } = useAudio(noiseAsset)

    const handleChangeNoise = (value: string) => {
        const isAlreadySelected = noiseAsset === value

        if (!isAlreadySelected) {
            setNoiseAsset(value)
            toggleAudioSrc()
            if (!isPlaying) {
                togglePlaying()
            }
        }
    }

    return (
        <SoundControllerContainer>
            <SoundControllerTitle>
                <span>Ambient Sound</span>
                <SoundControllerMuteButton
                    disabled={!noiseAsset}
                    onClick={togglePlaying}
                >
                    {isPlaying ? <SpeakerSlash /> : <SpeakerHigh />}
                </SoundControllerMuteButton>
            </SoundControllerTitle>
            <SoundControllerContent>
                {noises.map((noise) => {
                    const isSelected = noiseAsset === noise.sound
                    return (
                        <SoundControllerButton
                            $isSelected={isSelected}
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
