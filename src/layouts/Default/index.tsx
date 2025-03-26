import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer, RootContainer } from './styles'

export function DefaultLayout() {
    return (
        <RootContainer>
            <LayoutContainer>
                <Header />
                <Outlet />
            </LayoutContainer>
        </RootContainer>
    )
}
