import { SegmentedTabs } from '../SegmentedTabs'
import { NoiseControllersContainer, ToggleSoundButton } from './styles'
import { useAudio } from '../../hooks/useAudio'
import { useState } from 'react'
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

/*
    Pink noise can help increase productivity, memory, focus and attention span.
    Brown noise can aid in faster reaction time and organizational skills. 
*/

export function NoiseControllers() {
    const [noiseAsset, setNoiseAsset] = useState<string>('audio/pink.mp3')
    const { isPlaying, toggleAudioSrc, togglePlaying } = useAudio(noiseAsset)

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
        <NoiseControllersContainer>
            <SegmentedTabs
                name="noise_type"
                onChange={handleChangeNoise}
                options={[
                    { label: 'Pink Noise', id: 'audio/pink.mp3' },
                    { label: 'Brown Noise', id: 'audio/brown.mp3' },
                ]}
            />
            <ToggleSoundButton onClick={togglePlaying}>
                {isPlaying ? (
                    <SpeakerSlash size={24} />
                ) : (
                    <SpeakerHigh size={24} />
                )}
            </ToggleSoundButton>
        </NoiseControllersContainer>
    )
}
