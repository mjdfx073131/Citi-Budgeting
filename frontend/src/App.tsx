import React from 'react';
import './App.css';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StudentList/>
        <br/>
        <AddStudent/>
      </header>
    </div>
  );
}

export default App;
