import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import PredicateDropdown from './PredicateDropdown';
import ComparorDropdown from './ComparorDropdown';
import Condition from './Condition';
import WordBlock from './WordBlock';
import { ICondition } from './PredicateWrapper';

type PredicateType = 'string' | 'number';

export const predicates: { [key: string]: Predicate } = {
  'User Email': { type: 'string' },
  'Screen Width': { type: 'number' },
  'Screen Height': { type: 'number' },
  '# of Visits': { type: 'number' },
  'First Name': { type: 'string' },
  'Last Name': { type: 'string' },
  'Page Response time (ms)': { type: 'number' },
  Domain: { type: 'string' },
  'Page Path': { type: 'string' }
};

interface Predicate {
  type: PredicateType;
}

interface IProps {
  id: string;
  condition: ICondition;
  disabled: boolean;
  setCondition: (condition: ICondition) => void;
  removeRow: (id: string) => void;
}

export const PredicateBuilder: React.FC<IProps> = props => {
  const { condition, setCondition, disabled } = props;

  const handlePredicateChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, column: e.currentTarget.value });
  };

  const handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, conditionType: e.currentTarget.value });
  };

  const handleSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, condition1: e.currentTarget.value });
  };

  const handleSecondSelectedConditionChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, condition2: e.currentTarget.value });
  };

  const comparorType = predicates[condition.column] && predicates[condition.column].type;
  const isBlockWords = ['in list', 'between', 'greater than', 'less than'];
  const andBlockWords = ['between'];
  return (
    <div className="mt-1">
      <button
        disabled={disabled}
        className={`mr-2 py-2 px-4 bg-white ${!disabled ? 'hover:bg-grey' : 'cursor-not-allowed'}`}
        onClick={() => props.removeRow(props.id)}
      >
        -
      </button>
      <PredicateDropdown selectedPredicate={condition.column} handlePredicateChange={handlePredicateChange} />
      {isBlockWords.indexOf(condition.conditionType) !== -1 && <WordBlock word="is" className="ml-2" />}
      <ComparorDropdown
        className="ml-2"
        selectedComparor={condition.conditionType}
        handleComparorChange={handleComparorChange}
        comparorType={comparorType}
      />
      {condition.conditionType && (
        <Condition
          className="ml-2"
          comparorType={comparorType}
          selectedValue={condition.condition1}
          handleSelectedValueChange={handleSelectedConditionChange}
        />
      )}
      {andBlockWords.indexOf(condition.conditionType) !== -1 && (
        <>
          <WordBlock className="ml-2" word="and" />
          <Condition
            className="ml-2"
            comparorType={comparorType}
            selectedValue={condition.condition2}
            handleSelectedValueChange={handleSecondSelectedConditionChange}
          />
        </>
      )}
    </div>
  );
};
