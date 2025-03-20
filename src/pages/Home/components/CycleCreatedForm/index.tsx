import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useFormContext } from 'react-hook-form';
import { useCyclesContext } from '../../../../contexts/CyclesContext';

export function CycleCreatedForm() {
    const { activeCycle } = useCyclesContext();
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                list="task-suggestions"
                placeholder="Dê um nome para o seu projeto"
                id="task"
                disabled={!!activeCycle}
                {...register('task')}
            />
            <datalist id="task-suggestions">
                <option value="Projeto 1"></option>
                <option value="Projeto 2"></option>
                <option value="Projeto 3"></option>
                <option value="Banana"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                step={5}
                min={5}
                max={60}
                type="number"
                placeholder="00"
                id="minutesAmount"
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    );
}
