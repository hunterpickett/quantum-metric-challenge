import React from 'react';

interface IProps {
    className?: string;
    selectedValue: string | number;
    handleSelectedValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Condition: React.SFC<IProps> = props => {
    const { className, selectedValue, handleSelectedValueChange } = props;
    return (
        <input className={`${className} h-10 w-32 bg-grey-light`} value={selectedValue} onChange={handleSelectedValueChange} />
    )
}

export default Condition;