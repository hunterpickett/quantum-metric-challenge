import React from 'react';
import axios from 'axios';
import { ICondition } from './PredicateWrapper';

interface IProps {
  conditions: ICondition[];
  setSql: (sql: string) => void;
}

const SearchButton: React.FC<IProps> = props => {
  const { conditions, setSql } = props;
  const getSql = () => {
    axios
      .post('http://localhost:8080/api/getSql', {
        conditions
      })
      .then((res: any) => {
        setSql(res.data);
      });
  };
  return (
    <div className="flex justify-end py-2">
      <button onClick={getSql} className="px-3 py-2 w-48 bg-blue-quantum rounded-sm text-white">
        Search
      </button>
    </div>
  );
};

export default SearchButton;
