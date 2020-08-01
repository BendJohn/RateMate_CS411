import React from 'react';
import history from '../utils/history';
import { Button } from 'reactstrap';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        enrollments: this.props.enrollments
    };
  }


  render() {
    return (
      <>
        <Button onClick={() => history.push({pathname: '/'})}> Courses </Button>
        <Button onClick={() => history.push({pathname: '/Recommendations'})}> Recommendations </Button>
        <Button onClick={() => history.push(
            { pathname: '/Enrollments', 
              state: {
              enrollments: this.state.enrollments,
            }})}> Enrollments </Button>
      </>
    )
  }
}

export default NavBar;
