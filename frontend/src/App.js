import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProfessorDashboard } from './components/ProfessorDashboard'

export class App extends React.Component {
  render() {
    return (
      <>
          <ProfessorDashboard/>
      </>
    )
  }
}

export default App;
