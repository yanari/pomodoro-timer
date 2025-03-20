import {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    useState,
} from 'react';
import { cyclesReducer } from '../reducers/cycles/reducer';
import {
    addNewCycleAction,
    finishCurrentCycleAction,
    interruptCurrentCycleAction,
} from '../reducers/cycles/actions';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

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

const CyclesContext = createContext({} as CyclesContextType);

export function useCyclesContext() {
    return useContext(CyclesContext);
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

const initialState = {
    cycles: [],
    activeCycleId: null,
};

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, initialState);

    const { cycles, activeCycleId } = cyclesState;
    
    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const setSecondsPassed = (seconds: number) => {
        setAmountsSecondsPassed(seconds);
    };

    const finishCurrentCycle = () => {
        dispatch(finishCurrentCycleAction());
    };

    const interruptCurrentCycle = () => {
        dispatch(interruptCurrentCycleAction());
    };

    const createNewCycle = (data: CreateCycleData) => {
        const id = String(new Date().getTime());
        const cycleCreated: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        // setCycles((state) => [...state, cycleCreated]);
        dispatch(addNewCycleAction(cycleCreated));
        // setActiveCycleId(id);
        setAmountsSecondsPassed(0);
    };

    const interruptCycle = () => {
        interruptCurrentCycle();
        // setActiveCycleId(null);
        setAmountsSecondsPassed(0);
    };

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                finishCurrentCycle,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
}
