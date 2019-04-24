import React from 'react';
import { CompareType } from './ComparorDropdown';

interface IProps {
    className?: string;
    comparorType: CompareType;
    selectedValue: string | number;
    handleSelectedValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Condition: React.SFC<IProps> = props => {
    const { className, comparorType, selectedValue, handleSelectedValueChange } = props;
    return (
        <input
            type={comparorType}
            className={`${className} ${comparorType === 'number' && 'text-right'} px-2 h-10 w-32 bg-grey-light border border-grey`}
            value={selectedValue}
            onChange={handleSelectedValueChange}
        />
    )
}

export default Condition;