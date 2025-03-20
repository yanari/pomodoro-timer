import { Cycle } from '../../contexts/CyclesContext';
import { ActionTypes } from './actions';

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action) {
    switch (action.type) {
        case ActionTypes.ADD:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.cycleCreated],
                activeCycleId: action.payload.cycleCreated.id,
            };

        case ActionTypes.FINISH:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return {
                            ...cycle,
                            finishedDate: new Date(),
                        };
                    } else {
                        return cycle;
                    }
                }),
            };
        case ActionTypes.INTERRUPT:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return {
                            ...cycle,
                            interruptedDate: new Date(),
                        };
                    } else {
                        return cycle;
                    }
                }),
                activeCycleId: null,
            };
        default:
            return state;
    }
}
