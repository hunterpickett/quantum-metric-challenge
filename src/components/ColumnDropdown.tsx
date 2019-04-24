import React from 'react';

type PredicateType = 'string' | 'number';

const predicates: { [key: string]: Predicate } = {
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
  selectedPredicate: string;
  handleColumnChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}
const ColumnDropdown: React.SFC<IProps> = props => {
  const { selectedPredicate, handleColumnChange } = props;
  return (
    <>
      <select
        className="h-10 bg-grey-light text-grey-darkest rounded-sm border border-grey"
        value={selectedPredicate}
        onChange={handleColumnChange}
      >
        {Object.keys(predicates).map(p => {
          return <option key={p}>{p}</option>;
        })}
      </select>
    </>
  );
};

export default ColumnDropdown;
