import { useEffect } from 'react';
import { CountdownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { useCyclesContext } from '../../../../contexts/CyclesContext';

export function Countdown() {
    const {
        activeCycle,
        activeCycleId,
        finishCurrentCycle,
        amountSecondsPassed,
        setSecondsPassed,
    } = useCyclesContext();

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                const differenceSeconds = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                );

                if (differenceSeconds >= totalSeconds) {
                    finishCurrentCycle();
                    setSecondsPassed(totalSeconds);
                } else {
                    setSecondsPassed(differenceSeconds);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [
        activeCycle,
        totalSeconds,
        activeCycleId,
        finishCurrentCycle,
        setSecondsPassed,
    ]);

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    );
}
