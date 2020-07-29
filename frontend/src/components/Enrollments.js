import React from 'react';
import { NavBar } from './NavBar'

export class Enrollments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: []
        };
    }

    async componentDidMount() {
        if (this.props.location.state.enrollments) {
            this.setState({
                enrollments: this.props.location.state.enrollments
            })
        }
    }

    render() {
        return (
            <>
            <NavBar/>
            <h1 id='title'> Enrollments Page </h1>
            {console.log(this.state.enrollments)}
            </>
        )
    }
}

export default Enrollments;