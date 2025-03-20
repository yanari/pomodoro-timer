import { Scroll, Timer } from 'phosphor-react';
import { HeaderContainer } from './styles';
import { NavLink } from 'react-router-dom';
import { SegmentedTabs } from '../SegmentedTabs';

export function Header() {
    return (
        <HeaderContainer>
            <SegmentedTabs
                name="noise_type"
                options={[
                    {label: 'White Noise', id: 'white'},
                    {label: 'Gray Noise', id: 'gray'},
                ]}
            />
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
