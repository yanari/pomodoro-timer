import { useMemo, useEffect, useState } from 'react';

export function useAudio(url: string) {
    const audio = useMemo(() => {
        const audioObject = new Audio(url);

        return audioObject;
    }, [url]);
    const [isPlaying, setPlaying] = useState(false);

    const togglePlaying = () => {
        setPlaying(!isPlaying);
    };

    const toggleAudioSrc = () => {
        audio.srcObject = null;
    };

    useEffect(() => {}, [url, audio]);
    useEffect(() => {
        audio.loop = true;
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying, audio]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return { isPlaying, togglePlaying, toggleAudioSrc };
}
