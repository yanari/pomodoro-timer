import { Fragment } from 'react';
import { SegmentedTabsContainer } from './styles';

interface Option {
    label: string;
    id: string;
}

interface SegmentedTabsProps {
    name: string;
    options: Option[];
    onChange: (option: string) => void;
}

export function SegmentedTabs(props: SegmentedTabsProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = (event.target) as HTMLInputElement;
        props.onChange(target.value);
    }

    return (
        <SegmentedTabsContainer>
            {props.options.map((option) => {
                return (
                    <Fragment key={option.id}>
                        <input
                            type="radio"
                            id={option.id}
                            value={option.id}
                            name={props.name}
                            onChange={handleChange}
                        />
                        <label htmlFor={option.id}>{option.label}</label>
                    </Fragment>
                );
            })}
        </SegmentedTabsContainer>
    );
}
