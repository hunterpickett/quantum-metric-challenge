import React, { useState } from 'react';
import { PredicateBuilder } from './PredicateBuilder';
import SearchButton from './SearchButton';
import AddCondition from './AddCondition';

export interface ICondition {
  id: string;
  column: string;
  comparor: string;
  condition1: string | number;
  condition2: string | number;
}

const defaultCondition: any = () => {
  return {
    id: new Date().toISOString(),
    column: 'User Email',
    comparor: '',
    condition1: '',
    condition2: ''
  };
};

export const PredicateWrapper = () => {
  const [conditions, setConditions] = useState<ICondition[]>([defaultCondition()]);
  const [sql, setSql] = useState<string>('');

  const addCondition = () => {
    setConditions([...conditions, defaultCondition()]);
  };

  const setCondition = (condition: ICondition) => {
    let newConditions = conditions.map(c => {
      return c.id === condition.id ? condition : c;
    });
    setConditions(newConditions);
  };

  const removeRow = (id: string) => {
    let newConditions = conditions;
    newConditions = newConditions.filter(c => c.id !== id);
    setConditions([...newConditions]);
  };

  return (
    <>
      <div className="mt-1">
        {conditions.map((c, index) => {
          return (
            <PredicateBuilder
              key={`${c.id}`}
              id={c.id}
              condition={c}
              setCondition={setCondition}
              disabled={conditions && conditions.length <= 1}
              removeRow={removeRow}
            />
          );
        })}
        <AddCondition addCondition={addCondition} />
        <SearchButton conditions={conditions} setSql={setSql} />
      </div>
      <div className="font-mono mt-2 text-center px-20">{sql}</div>
    </>
  );
};
