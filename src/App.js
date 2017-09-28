import React, { Component } from 'react';
import './App.css';

import Graph from './components/Graph';

class App extends Component {
  render() {
    return (
      <div className="App">
      
          <p>React Cytoscape!</p>
          <Graph/>

      </div>
    );
  }
}

export default App;
