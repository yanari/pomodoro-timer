import { HandPalm, Play } from 'phosphor-react';
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CycleStartedForm } from './components/CycleStartedForm';
import { Countdown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form';
import { useCyclesContext } from '../../contexts/CyclesContext';

const cycleStartedFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type CycleStartedFormData = zod.infer<typeof cycleStartedFormValidationSchema>;

export function Home() {
    const { createNewCycle, interruptCycle, activeCycle } = useCyclesContext();

    const cycleStartedForm = useForm<CycleStartedFormData>({
        resolver: zodResolver(cycleStartedFormValidationSchema),
    });

    const { handleSubmit, watch, reset } = cycleStartedForm;

    const task = watch('task');
    const isSubmitDisabled = !task;

    const handleCreateNewCycle = (data: CycleStartedFormData) => {
        createNewCycle(data);
        reset();
    };

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...cycleStartedForm}>
                    <CycleStartedForm />
                </FormProvider>

                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={interruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton
                        disabled={isSubmitDisabled}
                        type="submit"
                    >
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}
