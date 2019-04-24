import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PredicateBuilder } from './components/PredicateBuilder';

export const App = () => {
  return (
    <div className="bg-grey-lightest">
      <div className="mx-3">
        <Header />
        <PredicateBuilder />
        <Footer />
      </div>
    </div>
  );
}

export default App;
