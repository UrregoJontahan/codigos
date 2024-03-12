import './App.css';
import React from 'react';
import { UseState } from './UseState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <UseReducer name="use Reducer" />
    </div>
  );
}

export default App;
