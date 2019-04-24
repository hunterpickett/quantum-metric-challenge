import React from 'react';

const stringComparors: string[] = ["equals", "contains", "starts with", "in list"];
const numberComparors: string[] = ["equals", "between", "greater than", "less than", "in list"];

type CompareType = "string" | "number";

const getCompareList = (c: CompareType) => {
    switch (c) {
        case "string":
            return stringComparors;
        case "number":
            return numberComparors;
    }
}

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