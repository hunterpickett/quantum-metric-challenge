import React from 'react';

interface IProps {
  disabled: boolean;
  removeRow: () => void;
}

const DeleteButton: React.FC<IProps> = props => {
  const { disabled, removeRow } = props;
  return (
    <button
      disabled={disabled}
      className={`mr-2 py-2 px-4 bg-white ${!disabled ? 'hover:bg-grey' : 'cursor-not-allowed'}`}
      onClick={removeRow}
    >
      -
    </button>
  );
};

export default DeleteButton;
