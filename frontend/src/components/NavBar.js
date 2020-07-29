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
        <Button onClick={() => history.push({pathname: '/'})}> Professor Dashboard </Button>
        <Button onClick={() => history.push({pathname: '/Courses'})}> Courses </Button>
        <Button onClick={() => history.push({pathname: '/Recommendations', state: {recs: ["hi"]}})}> Recommendations </Button>
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
