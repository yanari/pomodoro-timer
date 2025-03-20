import { ReactNode, useEffect, useReducer, useState } from 'react';
import { cyclesReducer } from '../../reducers/cycles/reducer';
import {
    addNewCycleAction,
    finishCurrentCycleAction,
    interruptCurrentCycleAction,
} from '../../reducers/cycles/actions';
import { CreateCycleData, Cycle, CyclesContext } from '.';
import { differenceInSeconds } from 'date-fns';

interface CyclesContextProviderProps {
    children: ReactNode;
}

const LOCAL_STORAGE_KEY = '@concentratimer:cycles-state-1.0.0';

const initialState = {
    cycles: [],
    activeCycleId: null,
};

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        initialState,
        () => {
            // disparada assim que o reducer é criado
            const storedStateAsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON);
            }
        }
    );
    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem(LOCAL_STORAGE_KEY, stateJSON);
    }, [cyclesState]);

    const [amountSecondsPassed, setAmountsSecondsPassed] = useState<number>(
        () => {
            if (activeCycle) {
                return differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                );
            }
            return 0;
        }
    );

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

        dispatch(addNewCycleAction(cycleCreated));
        setAmountsSecondsPassed(0);
    };

    const interruptCycle = () => {
        interruptCurrentCycle();
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
