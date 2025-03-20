import { createContext, useContext } from 'react';

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    finishCurrentCycle: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCycle: () => void;
}

export interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function useCyclesContext() {
    return useContext(CyclesContext);
}

export { CyclesContextProvider } from './provider';
