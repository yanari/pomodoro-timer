import { Scroll, Timer } from 'phosphor-react';
import { HeaderContainer } from './styles';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <HeaderContainer>
            <span>
                {/* <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label> */}
            </span>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    );
}
