import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PredicateWrapper } from './components/PredicateWrapper';

export const App = () => {
  return (
    <div className="bg-grey-lightest">
      <div className="mx-3">
        <Header />
        <PredicateWrapper />
      </div>
    </div>
  );
}

export default App;
