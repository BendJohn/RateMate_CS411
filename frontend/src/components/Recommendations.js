import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';

export class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recs: [],
            enrollments: ["props passed from recommendations"]
        };
    }


    render() {
        return (
            <>
                <NavBar
                    enrollments={this.state.enrollments}
                />

            <h1 id='title'> Recommendations </h1>
            </>
        )
    }
}

export default Recommendations;