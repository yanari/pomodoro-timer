import { produce } from 'immer';
import { Cycle } from '../../contexts/CyclesContext';
import { ActionTypes } from './actions';

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action) {
    switch (action.type) {
        case ActionTypes.ADD:
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.cycleCreated);
                draft.activeCycleId = action.payload.cycleCreated.id;
            });

        case ActionTypes.FINISH: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });

            if (currentCycleIndex > 0) {
                return state;
            }
            return produce(state, (draft) => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].finishedDate = new Date();
            });
        }
        case ActionTypes.INTERRUPT: {
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId;
            });

            if (currentCycleIndex > 0) {
                return state;
            }
            return produce(state, (draft) => {
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndex].interruptedDate = new Date();
            });
        }
        default:
            return state;
    }
}
