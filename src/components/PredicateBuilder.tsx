import React, { useState, useEffect } from 'react';
import PredicateDropdown from './PredicateDropdown';
import ComparorDropdown from './ComparorDropdown';
import Condition from './Condition';
import WordBlock from './WordBlock';
import { ICondition } from './PredicateWrapper';
import { conditionalExpression } from '@babel/types';

type PredicateType = "string" | "number";

export const predicates: { [key: string]: Predicate; } = {
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
    id: number;
    conditions: ICondition[];
    setConditions: React.Dispatch<React.SetStateAction<ICondition[]>>;
    removeRow: (id: number) => void;
}

export const PredicateBuilder: React.SFC<IProps> = props => {

    const [selectedPredicate, setSelectedPredicate] = useState<string>('User Email');
    const [selectedComparor, setSelectedComparor] = useState<string>('');
    const [selectedCondition, setSelectedCondition] = useState<string | number>('');
    const [selectedSecondCondition, setSelectedSecondCondition] = useState<string | number>('');

    useEffect(() => {
        setConditions();
    });

    const setConditions = () => {
        let condition: ICondition = {
            column: selectedPredicate,
            conditionType: selectedComparor,
            condition1: selectedCondition,
            condition2: selectedSecondCondition
        }
        let newConditions = props.conditions;
        newConditions[props.id] = condition;
        props.setConditions(newConditions);
    }

    const handlePredicateChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === undefined) return;
        setSelectedPredicate(e.currentTarget.value);
    }

    const handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === undefined) return;
        setSelectedComparor(e.currentTarget.value);
    }

    const handleSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === undefined) return;
        setSelectedCondition(e.currentTarget.value);
    }

    const handleSecondSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === undefined) return;
        setSelectedSecondCondition(e.currentTarget.value);
    }

    const comparorType = predicates[selectedPredicate] && predicates[selectedPredicate].type
    const isBlockWords = ["in list", "between", "greater than", "less than"];
    const andBlockWords = ["between"];
    const disabled = props.conditions && props.conditions.length <= 1;
    return (
        <div className="mt-1">
            <button disabled={disabled} className={`mr-2 py-2 px-4 bg-white ${!disabled ? 'hover:bg-grey' : 'cursor-not-allowed'}`} onClick={() => props.removeRow(props.id)}>-</button>
            <PredicateDropdown
                selectedPredicate={selectedPredicate}
                handlePredicateChange={handlePredicateChange}
            />
            {isBlockWords.indexOf(selectedComparor) !== -1 && <WordBlock word="is" className="ml-2" />}
            <ComparorDropdown
                className="ml-2"
                selectedComparor={selectedComparor}
                handleComparorChange={handleComparorChange}
                comparorType={comparorType}
            />
            {
                selectedComparor &&
                <Condition
                    className="ml-2"
                    comparorType={comparorType}
                    selectedValue={selectedCondition}
                    handleSelectedValueChange={handleSelectedConditionChange}
                />
            }
            {
                andBlockWords.indexOf(selectedComparor) !== -1 &&
                <>
                    <WordBlock className="ml-2" word="and" />
                    <Condition
                        className="ml-2"
                        comparorType={comparorType}
                        selectedValue={selectedSecondCondition}
                        handleSelectedValueChange={handleSecondSelectedConditionChange}
                    />
                </>
            }
        </div >
    )
}





