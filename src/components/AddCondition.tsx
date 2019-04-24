import React from 'react';

interface IProps {
  addCondition: () => void;
}

const AddCondition: React.FC<IProps> = props => {
  const { addCondition } = props;
  return (
    <button onClick={addCondition} className="mt-2 bg-blue-quantum py-2 px-4 text-white w-24">
      And
    </button>
  );
};

export default AddCondition;
