import {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    useState,
} from 'react';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
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

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        if (action.type === 'ADD') {
            return [...state, action.payload.cycleCreated];
        }
        if (action.type === 'FINISH') {
        }
        if (action.type === 'INTERRUPT') {
        }
        return state;
    }, []);

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const setSecondsPassed = (seconds: number) => {
        setAmountsSecondsPassed(seconds);
    };

    const finishCurrentCycle = () => {
        dispatch({
            type: 'FINISH',
            payload: {
                activeCycleId,
            },
        });
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return {
        //                 ...cycle,
        //                 finishedDate: new Date(),
        //             };
        //         } else {
        //             return cycle;
        //         }
        //     })
        // );
    };

    const interruptCurrentCycle = () => {
        dispatch({
            type: 'INTERRUPT',
            payload: {
                activeCycleId,
            },
        });
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return {
        //                 ...cycle,
        //                 interruptedDate: new Date(),
        //             };
        //         } else {
        //             return cycle;
        //         }
        //     })
        // );
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
        dispatch({
            type: 'ADD',
            payload: {
                cycleCreated,
            },
        });
        setActiveCycleId(id);
        setAmountsSecondsPassed(0);
    };

    const interruptCycle = () => {
        interruptCurrentCycle();
        setActiveCycleId(null);
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
