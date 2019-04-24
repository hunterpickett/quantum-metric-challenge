import React from 'react';

type PredicateType = "string" | "number";

const predicates: { [key: string]: Predicate; } = {
    "User Email": { type: "string" },
    "Screen Width": { type: "number" },
    "Screen Height": { type: "number" },
    "# of Visits": { type: "number" },
    "First Name": { type: "string" },
    "Last Name": { type: "string" },
    "Page Response time (ms)": { type: "number" },
    "Domain": { type: "string" },
    "Page Path": { type: "string" }
};

interface Predicate {
    type: PredicateType
}


const stringComparors: string[] = ["equals", "contains", "starts with", "in list"];
const numberComparors: string[] = ["equals", "between", "greater than", "less than", "in list"];

const getCompareList = (c: CompareType) => {
    switch (c) {
        case "string":
            return stringComparors;
        case "number":
            return numberComparors;
    }
}

type CompareType = "string" | "number";

interface IProps {
    comparorType: CompareType
    className?: string;
    selectedComparor: string;
    handleComparorChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}
export const ComparorDropdown: React.SFC<IProps> = props => {
    const { comparorType, className, selectedComparor, handleComparorChange } = props;
    let compareList = getCompareList(comparorType);
    return (
        <select className={`${className} h-10 w-32 bg-grey-light`} value={selectedComparor} onChange={handleComparorChange}>
            {compareList.map(s => {
                return <option key={s}>{s}</option>
            })}
        </select>
    )
}