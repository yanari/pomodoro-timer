import { Cycle } from '../../contexts/CyclesContext/cycles.interface';

export enum ActionTypes {
    ADD = 'ADD',
    FINISH = 'FINISH',
    INTERRUPT = 'INTERRUPT',
}

export function addNewCycleAction(cycleCreated: Cycle) {
    return {
        type: ActionTypes.ADD,
        payload: cycleCreated,
    };
}

export function finishCurrentCycleAction() {
    return {
        type: ActionTypes.FINISH,
    };
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.INTERRUPT,
    };
}
