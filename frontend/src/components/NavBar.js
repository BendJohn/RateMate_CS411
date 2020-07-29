import React from 'react';
import history from '../utils/history';
import { Button } from 'reactstrap';

export class NavBar extends React.Component {
  render() {
    return (
      <>
        <Button onClick={() => history.push('/')}> Professor Dashboard </Button>
        <Button onClick={() => history.push('/Recommendations')}> Recommendations </Button>
        <Button onClick={() => history.push('/Enrollments')}> Enrollments </Button>
      </>
    )
  }
}

export default NavBar;
