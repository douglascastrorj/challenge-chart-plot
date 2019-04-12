import React, { Component } from 'react';
import './App.css';

import CodeEditor from './components/CodeEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
       <CodeEditor />
      </div>
    );
  }
}

export default App;
