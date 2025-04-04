// import { formatDistanceToNow } from 'date-fns'
// import { usePomodoroContext } from '../../contexts/PomodoroContext'
import {
    HistoryContainer,
    // HistoryList
} from './styles'

export function History() {
    // const { pomodoroSections } = usePomodoroContext()
    return (
        <HistoryContainer>
            <h1>History</h1>
            {/* <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Streak</th>
                            <th>Started at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pomodoroSections.map((section) => {
                            return (
                                <tr key={String(section.startTime)}>
                                    <td>
                                        {section.completedPomodoros} 🍅
                                        Pomodoros completed
                                    </td>
                                    <td>
                                        {formatDistanceToNow(
                                            section.startTime,
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
            </HistoryList> */}
        </HistoryContainer>
    )
}
