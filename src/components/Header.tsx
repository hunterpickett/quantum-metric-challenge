import React from 'react';

export const Header = () => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <h1 className="uppercase text-xl text-grey-dark">Search For Sessions</h1>
      <button className="px-3 py-2 bg-blue-quantum rounded-sm text-white">Today</button>
    </div>
  );
};
