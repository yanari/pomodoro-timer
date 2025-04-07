import { formatDistanceToNow } from 'date-fns'
import { usePomodoroContext } from '../../contexts/PomodoroContext'
import { HistoryContainer, HistoryList } from './styles'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function History() {
    const navigate = useNavigate()
    const { sections, hasSections } = usePomodoroContext()

    useEffect(() => {
        if (!hasSections) {
            navigate('/')
        }
    }, [])

    return (
        <HistoryContainer>
            <h1>History</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Streak</th>
                            <th>Started at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => {
                            return (
                                <tr key={String(section.id)}>
                                    <td>
                                        {section.pomodoroCount} 🍅 Pomodoros
                                        completed
                                    </td>
                                    <td>
                                        {formatDistanceToNow(
                                            section.startedAt,
                                            {
                                                addSuffix: true,
                                            }
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
