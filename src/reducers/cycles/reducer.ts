import { produce } from 'immer';
import { ActionTypes } from './actions';
import { Cycle } from '../../contexts/CyclesContext/cycles.interface';

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

type CyclesAction = {
    type: string;
    payload?: Cycle;
};

export function cyclesReducer(state: CyclesState, action: CyclesAction) {
    switch (action.type) {
        case ActionTypes.ADD:
            return produce(state, (draft) => {
                if (action.payload) {
                    draft.cycles.push(action.payload);
                    draft.activeCycleId = action.payload.id;
                }
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
