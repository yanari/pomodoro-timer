import { ReactNode } from 'react'
import { TagContainer } from './styles'

interface TagProps {
    children: ReactNode
}
export function Tag({ children }: TagProps) {
    return <TagContainer>{children}</TagContainer>
}
