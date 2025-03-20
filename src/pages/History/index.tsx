import { HistoryContainer, HistoryList, Status } from './styles';
import { useCyclesContext } from '../../contexts/CyclesContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function History() {
    const { cycles } = useCyclesContext();
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status color="green">
                                                Concluído
                                            </Status>
                                        )}
                                        {cycle.interruptedDate && (
                                            <Status color="red">
                                                Interrompido
                                            </Status>
                                        )}
                                        {!cycle.finishedDate &&
                                            !cycle.interruptedDate && (
                                                <Status color="yellow">
                                                    Em andamento
                                                </Status>
                                            )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
