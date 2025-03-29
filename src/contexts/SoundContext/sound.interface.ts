export enum Assets {
    BROWN = 'audio/brown.mp3',
    PINK = 'audio/pink.mp3',
    COFFEE = 'audio/coffee.mp3',
}

export interface SoundContextType {
    isPlaying: boolean
    assetSrc: Assets
    play: () => void
    pause: () => void
    setAssetSource: (assetPath: Assets) => void
}
