import React from 'react';
import history from '../utils/history';
import { Button } from 'reactstrap';

export class NavBar extends React.Component {
  render() {
    return (
      <>
        <Button onClick={() => history.push({pathname: '/'})}> Courses </Button>
        <Button onClick={() => history.push({pathname: '/Recommendations'})}> Recommendations </Button>
        <Button onClick={() => history.push({pathname: '/Enrollments'})}> Enrollments </Button>
      </>
    )
  }
}

export default NavBar;
