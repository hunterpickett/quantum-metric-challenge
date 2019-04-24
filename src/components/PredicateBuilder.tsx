import React, { useState } from 'react';
import PredicateDropdown from './PredicateDropdown';
import ComparorDropdown from './ComparorDropdown';
import { Condition } from './Condition';
import WordBlock from './WordBlock';

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

export const PredicateBuilder = () => {

    const [selectedPredicate, setSelectedPredicate] = useState<string>('User Email');
    const [selectedComparor, setSelectedComparor] = useState<string>('');
    const [selectedCondition, setSelectedCondition] = useState<string | number>('');
    const [selectedSecondCondition, setSelectedSecondCondition] = useState<string | number>('');

    const handlePredicateChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedPredicate(e.currentTarget.value)
    }

    const handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedComparor(e.currentTarget.value);
    }

    const handleSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedCondition(e.currentTarget.value);
    }

    const handleSecondSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) return;
        setSelectedSecondCondition(e.currentTarget.value);
    }

    const comparorType = predicates[selectedPredicate] && predicates[selectedPredicate].type
    const isBlockWords = ["in list", "between", "greater than", "less than"];
    const andBlockWords = ["between"];
    return (
        <div className="py-3">
            <PredicateDropdown
                selectedPredicate={selectedPredicate}
                handlePredicateChange={handlePredicateChange}
            />
            {isBlockWords.indexOf(selectedComparor) != -1 && <WordBlock word="is" className="ml-2" />}
            <ComparorDropdown
                className="ml-2"
                selectedComparor={selectedComparor}
                handleComparorChange={handleComparorChange}
                comparorType={comparorType}
            />
            {selectedComparor &&
                <Condition
                    className="ml-2"
                    selectedValue={selectedCondition}
                    handleSelectedValueChange={handleSelectedConditionChange}
                />
            }
            {andBlockWords.indexOf(selectedComparor) != -1 &&
                <>
                    <WordBlock className="ml-2" word="and" />
                    <Condition
                        className="ml-2"
                        selectedValue={selectedSecondCondition}
                        handleSelectedValueChange={handleSecondSelectedConditionChange}
                    />
                </>
            }
        </div>
    )
}





