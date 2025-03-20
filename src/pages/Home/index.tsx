import { HandPalm, Play } from 'phosphor-react';
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useState } from 'react';
import { CycleStartedForm } from './components/CycleStartedForm';
import { Countdown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form';

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    finishCurrentCycle: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

const cycleStartedFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type CycleStartedFormData = zod.infer<typeof cycleStartedFormValidationSchema>;

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(0);

    const cycleStartedForm = useForm({
        resolver: zodResolver(cycleStartedFormValidationSchema),
    });

    const { handleSubmit, watch, reset } = cycleStartedForm;

    const finishCurrentCycle = () => {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date(),
                    };
                } else {
                    return cycle;
                }
            })
        );
    };

    const interruptCurrentCycle = () => {
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date(),
                    };
                } else {
                    return cycle;
                }
            })
        );
    };

    const handleCreateNewCycle = (data: CycleStartedFormData) => {
        const id = String(new Date().getTime());
        const cycleStarted: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        setCycles((state) => [...state, cycleStarted]);
        setActiveCycleId(id);
        setAmountsSecondsPassed(0);
        reset();
    };

    const handleInterruptCycle = () => {
        interruptCurrentCycle();
        setActiveCycleId(null);
        setAmountsSecondsPassed(0);
    };

    const setSecondsPassed = (seconds: number) => {
        setAmountsSecondsPassed(seconds);
    };

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                finishCurrentCycle,
                amountSecondsPassed,
                setSecondsPassed,
            }}
        >
            <HomeContainer>
                <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...cycleStartedForm}>
                        <CycleStartedForm />
                    </FormProvider>

                    <Countdown />

                    {activeCycle ? (
                        <StopCountdownButton
                            type="button"
                            onClick={handleInterruptCycle}
                        >
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
        </CyclesContext.Provider>
    );
}
