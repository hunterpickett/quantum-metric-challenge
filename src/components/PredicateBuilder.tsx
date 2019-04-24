import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import ComparorDropdown from './ComparorDropdown';
import Condition from './Condition';
import WordBlock from './WordBlock';
import { ICondition } from './PredicateWrapper';
import ColumnDropdown from './ColumnDropdown';
import DeleteButton from './DeleteButton';

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

  const handleColumnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, column: e.currentTarget.value });
  };

  const handleComparorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === undefined) return;
    setCondition({ ...props.condition, comparor: e.currentTarget.value });
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
      <DeleteButton disabled={disabled} removeRow={() => props.removeRow(props.id)} />
      <ColumnDropdown selectedPredicate={condition.column} handleColumnChange={handleColumnChange} />
      {isBlockWords.indexOf(condition.comparor) !== -1 && <WordBlock word="is" className="ml-2" />}
      <ComparorDropdown
        className="ml-2"
        selectedComparor={condition.comparor}
        handleComparorChange={handleComparorChange}
        comparorType={comparorType}
      />
      {condition.comparor && (
        <Condition
          className="ml-2"
          comparor={comparorType}
          selectedValue={condition.condition1}
          handleSelectedValueChange={handleSelectedConditionChange}
        />
      )}
      {andBlockWords.indexOf(condition.comparor) !== -1 && (
        <>
          <WordBlock className="ml-2" word="and" />
          <Condition
            className="ml-2"
            comparor={comparorType}
            selectedValue={condition.condition2}
            handleSelectedValueChange={handleSecondSelectedConditionChange}
          />
        </>
      )}
    </div>
  );
};
