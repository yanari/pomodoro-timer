import { useEffect } from 'react'

interface KeyboardToCallback {
    keyboardName: string
    callbackWhenPressed: () => void
}

export function useKeyboardShortcut(keyboardToCallbacks: KeyboardToCallback[]) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent triggering shortcuts when typing in input fields
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement
            ) {
                return
            }

            keyboardToCallbacks.forEach(
                ({ callbackWhenPressed, keyboardName }) => {
                    if (e.code === keyboardName) {
                        e.preventDefault()
                        callbackWhenPressed()
                    }
                }
            )
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
}
