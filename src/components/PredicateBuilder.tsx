import React, { useState } from 'react';
import { PredicateDropdown } from './PredicateDropdown';
import { ComparorDropdown } from './ComparorDropdown';

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

interface IProps {

}

interface IState {
    selectedPredicate: string;
    selectedComparor: string;
}

export const PredicateBuilder = () => {

    const [selectedPredicate, setSelectedPredicate] = useState('User Email');
    const [selectedComparor, setSelectedComparor] = useState('');

    const handlePredicateChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedPredicate(e.currentTarget.value)
    }

    const handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedComparor(e.currentTarget.value);
    }


    const comparorType = predicates[selectedPredicate] && predicates[selectedPredicate].type
    return (
        <div className="py-3">
            <PredicateDropdown
                selectedPredicate={selectedPredicate}
                handlePredicateChange={handlePredicateChange}
            />
            <ComparorDropdown
                className="ml-2"
                selectedComparor={selectedComparor}
                handleComparorChange={handleComparorChange}
                comparorType={comparorType}
            />
        </div>
    )
}





