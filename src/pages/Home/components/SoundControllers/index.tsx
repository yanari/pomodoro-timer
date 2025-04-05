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
import { useSoundContext } from '../../../../contexts/SoundContext'
import { Assets } from '../../../../contexts/SoundContext/sound.interface'
import { Tooltip } from 'react-tooltip'

const noises = [
    {
        label: 'Pink Noise',
        sound: Assets.PINK,
        icon: Brain,
        id: 'pink_noise',
        description:
            'Pink noise can help increase<br/> productivity, memory, focus<br/> and attention span.',
    },
    {
        label: 'Brown Noise',
        sound: Assets.BROWN,
        icon: Barcode,
        id: 'brown_noise',
        description:
            'Brown noise can aid<br/> in faster reaction time<br/> and organizational skills.',
    },
    {
        label: 'Coffee Shop',
        sound: Assets.COFFEE,
        icon: Coffee,
        id: 'coffee_shop',
        description:
            'Coffee shop noise can enhance focus,<br/> creativity, and productivity by providing a lively yet<br/> non-distracting background',
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
                            key={noise.id}
                            id={noise.id}
                            onClick={() => handleChangeNoise(noise.sound)}
                            data-tooltip-html={noise.description}
                            data-tooltip-place="bottom-end"
                            data-tooltip-id={noise.id}
                        >
                            <Icon size={24} />
                            <span>{noise.label}</span>
                            <Tooltip id={noise.id} />
                        </SoundControllerButton>
                    )
                })}
            </SoundControllerContent>
        </SoundControllerContainer>
    )
}
