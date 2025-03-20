import { Fragment } from 'react';
import { SegmentedTabsContainer } from './styles';

interface Option {
    label: string;
    id: string;
}

interface SegmentedTabsProps {
    name: string;
    options: Option[];
}

/*
    Pink noise can help increase productivity, memory, focus and attention span.
    Brown noise can aid in faster reaction time and organizational skills. 
*/
export function SegmentedTabs(props: SegmentedTabsProps) {
    return (
        <SegmentedTabsContainer>
            {props.options.map((option) => {
                return (
                    <Fragment key={option.id}>
                        <input
                            type="radio"
                            id={option.id}
                            value={option.label}
                            name={props.name}
                        />
                        <label htmlFor={option.id}>{option.label}</label>
                    </Fragment>
                );
            })}
        </SegmentedTabsContainer>
    );
}
