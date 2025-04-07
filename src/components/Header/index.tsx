import { Scroll, Timer } from '@phosphor-icons/react'
import { HeaderContainer } from './styles'
import { NavLink } from 'react-router-dom'
import { usePomodoroContext } from '../../contexts/PomodoroContext'

export function Header() {
    const { hasSections } = usePomodoroContext()

    return (
        <HeaderContainer>
            <nav>
                {hasSections && (
                    <>
                        <NavLink to="/" title="Timer">
                            <Timer size={24} />
                        </NavLink>
                        <NavLink to="/history" title="Histórico">
                            <Scroll size={24} />
                        </NavLink>
                    </>
                )}
            </nav>
        </HeaderContainer>
    )
}
