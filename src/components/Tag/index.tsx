import { ReactNode } from 'react'
import { TagContainer } from './styles'

interface TagProps {
    children: ReactNode
    as?: string
}
export function Tag({ children, as }: TagProps) {
    let isBig = false
    if (as && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as)) {
        isBig = true
    }
    return (
        <TagContainer $isBig={isBig} as={as}>
            {children}
        </TagContainer>
    )
}
