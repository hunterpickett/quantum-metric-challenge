import React from 'react';

const stringComparors: string[] = ['equals', 'contains', 'starts with', 'in list'];
const numberComparors: string[] = ['equals', 'between', 'greater than', 'less than', 'in list'];

export type CompareType = 'string' | 'number';

const getCompareList = (c: CompareType) => {
  switch (c) {
    case 'string':
      return stringComparors;
    case 'number':
      return numberComparors;
    default:
      return [];
  }
};

interface IProps {
  comparorType: CompareType;
  className?: string;
  selectedComparor: string;
  handleComparorChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export const ComparorDropdown: React.SFC<IProps> = props => {
  const { comparorType, className, selectedComparor, handleComparorChange } = props;
  let compareList = getCompareList(comparorType);
  return (
    <select
      className={`${className} h-10 w-32 bg-grey-lighter text-grey-darkest rounded-sm border border-grey`}
      value={selectedComparor}
      onChange={handleComparorChange}
    >
      <option label=" " />
      {compareList.map(s => {
        return <option key={s}>{s}</option>;
      })}
    </select>
  );
};

export default ComparorDropdown;
