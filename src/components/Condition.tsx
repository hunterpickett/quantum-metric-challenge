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
    comparorType: CompareType
    className?: string;
    selectedComparor: string;
    handleComparorChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export const Condition: React.SFC<IProps> = props => {
    const { comparorType, className, selectedComparor, handleComparorChange } = props;
    let compareList = getCompareList(comparorType);
    console.log(selectedComparor);
    return (
        <select className={`${className} h-10 w-32 bg-grey-light`} value={selectedComparor} onChange={handleComparorChange}>
            <option label=" "></option>
            {compareList.map(s => {
                return <option key={s}>{s}</option>
            })}
        </select>
    )
}

export default Condition;