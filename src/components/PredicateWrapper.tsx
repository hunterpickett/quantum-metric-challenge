import React, { useState } from 'react';
import axios from 'axios';
import { PredicateBuilder } from './PredicateBuilder';

export interface ICondition {
  id: string;
  column: string;
  conditionType: string;
  condition1: string | number;
  condition2: string | number;
}

const defaultCondition: any = () => {
  return {
    id: new Date().toISOString(),
    column: 'User Email',
    conditionType: '',
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

  const getSql = () => {
    axios
      .post('http://localhost:8080/api/getSql', {
        conditions
      })
      .then((res: any) => {
        setSql(res.data);
      });
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
        <button onClick={addCondition} className="mt-2 bg-blue-quantum py-2 px-4 text-white w-24">
          And
        </button>
      </div>
      <div className="font-mono mt-2 text-center">{sql}</div>
      <div className="flex justify-end py-2">
        <button onClick={getSql} className="px-3 py-2 w-48 bg-blue-quantum rounded-sm text-white">
          Search
        </button>
      </div>
    </>
  );
};
