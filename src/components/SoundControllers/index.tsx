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
import { useSoundContext } from '../../contexts/SoundContext'
import { Assets } from '../../contexts/SoundContext/sound.interface'

const noises = [
    { label: 'Pink Noise', sound: Assets.PINK, icon: Brain },
    {
        label: 'Brown Noise',
        sound: Assets.BROWN,
        icon: Barcode,
    },
    {
        label: 'Coffee Shop',
        sound: Assets.COFFEE,
        icon: Coffee,
    },
    // {
    //     label: 'Lo-Fi',
    //     sound: 'audio/brown.mp3',
    //     icon: <VinylRecord size={24} />,
    // },
]

export function SoundControllers() {
    const { isPlaying, pause, play, setAssetSource, assetSrc } =
        useSoundContext()

    const handleChangeNoise = (value: Assets) => {
        const isAlreadySelected = assetSrc === value

        if (isAlreadySelected) return

        setAssetSource(value)
        play()
    }

    return (
        <SoundControllerContainer>
            <SoundControllerTitle>
                <span>Ambient Sound</span>
                <SoundControllerMuteButton
                    disabled={!assetSrc}
                    onClick={isPlaying ? pause : play}
                >
                    {isPlaying ? <SpeakerSlash /> : <SpeakerHigh />}
                </SoundControllerMuteButton>
            </SoundControllerTitle>
            <SoundControllerContent>
                {noises.map((noise) => {
                    const isSelected = assetSrc === noise.sound
                    const Icon = noise.icon
                    return (
                        <SoundControllerButton
                            $isSelected={isSelected}
                            key={noise.label}
                            onClick={() => handleChangeNoise(noise.sound)}
                        >
                            <Icon size={24} />
                            <span>{noise.label}</span>
                        </SoundControllerButton>
                    )
                })}
            </SoundControllerContent>
        </SoundControllerContainer>
    )
}
