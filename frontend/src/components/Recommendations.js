import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';

export class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // List of courses
            recs: [
                {
                    professor_name: "Ben John", 
                    CRN: 312, 
                    name: "Disapproving Nicknames 101",
                    comments: "Comments!", 
                    availability: true,
                    avgGpa: 3.23,
                    requirements_filled: "",
                    prerequisites: "456"
                },
                {
                    professor_name: "Pocahontas", 
                    CRN: 333, 
                    name: "Advanced Algebra",
                    comments: "Comments!", 
                    availability: false,
                    avgGpa: 4.0,
                    requirements_filled: "English Gen Ed",
                    prerequisites: "222"
                }
            ],
            enrollments: ["props passed from recommendations"]
        };
    }

    renderTableData() {
        if (this.state.recs.length === 0) {
            return;
        }

        return this.state.recs.map((course, index) => {
        const { professor_name, CRN, name, comments, availability, avgGpa, requirements_filled, prerequisites } = course //destructuring
        return (
            <tr key={CRN}>
                <td> 
                    <Button id="delete"> Enroll </Button> &nbsp;
                    {CRN}
                </td>
                <td>{name} </td>
                <td>{professor_name} </td>
                <td>{avgGpa} </td>
                <td> {availability ? ("Open") : ("Closed")} </td>
                <td>{requirements_filled} </td>
                <td>{prerequisites} </td>
                <td>{comments} </td>
            </tr>
        )})
    }


    render() {
        return (
            <>
                <NavBar
                    enrollments={this.state.enrollments}
                />

                <h1 id='title'> Recommendations </h1>

                <table id='table'>
                    <tbody>
                        <tr> <th> CRN </th> <th> Name </th> <th> Professor </th> <th> Avg GPA </th> <th> Availability </th>
                        <th> Requirements Filled </th> <th> Prerequisites </th> <th> Comments </th> </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Recommendations;