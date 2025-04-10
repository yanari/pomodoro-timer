import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Assets, SoundContextType } from './sound.interface'

const SoundContext = createContext({} as SoundContextType)

interface SoundContextProviderProps {
    children: ReactNode
}

export function SoundContextProvider({ children }: SoundContextProviderProps) {
    const [isPlaying, setPlaying] = useState<boolean>(false)
    const [assetSrc, setAssetSrc] = useState<Assets>(Assets.BROWN)

    const audio = useMemo(() => {
        let audioObject = new Audio(assetSrc)

        return audioObject
    }, [assetSrc])

    const play = () => setPlaying(true)

    const pause = () => setPlaying(false)

    const setAssetSource = (assetPath: Assets) => setAssetSrc(assetPath)

    useEffect(() => {
        return () => {
            audio.srcObject = null
        }
    }, [assetSrc])

    useEffect(() => {
        audio.loop = true
        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [isPlaying, audio])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [audio])

    return (
        <SoundContext.Provider
            value={{
                isPlaying,
                assetSrc,
                pause,
                play,
                setAssetSource,
            }}
        >
            {children}
        </SoundContext.Provider>
    )
}

export function useSoundContext() {
    return useContext(SoundContext)
}
