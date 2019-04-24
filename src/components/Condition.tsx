import React from 'react';
import { CompareType } from './ComparorDropdown';

interface IProps {
  className?: string;
  comparor: CompareType;
  selectedValue: string | number;
  handleSelectedValueChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Condition: React.SFC<IProps> = props => {
  const { className, comparor, selectedValue, handleSelectedValueChange } = props;
  return (
    <input
      type={comparor}
      className={`${className} ${comparor === 'number' &&
        'text-right'} px-2 h-10 w-32 bg-grey-lighter border border-grey`}
      value={selectedValue}
      onChange={handleSelectedValueChange}
    />
  );
};

export default Condition;
