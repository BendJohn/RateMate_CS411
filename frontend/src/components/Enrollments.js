import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';

export class Enrollments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // List of courses
            enrollments: [
                {
                    professor_name: "John Smith", 
                    CRN: 123, 
                    name: "Intro to CS",
                    comments: "Comments!", 
                    availability: true,
                    avgGpa: 3.33,
                    requirements_filled: "Science Gen Ed",
                    prerequisites: "123"
                },
            ]
        };
    }

    async componentDidMount() {
        // get all enrollments
        if (this.props.location.state.enrollments) {
            this.setState({
                enrollments: this.props.location.state.enrollments
            })
        }
    }

    
    async deleteEnrollment(course) {
        var enrolls = this.state.enrollments;

        for (var i = 0; i < enrolls.length; i++) {
            if (enrolls[i].CRN === course.CRN) {
                // await deleteProfessor(profs[i].professor_name);
                enrolls.splice(i, 1);
                break;
            }
        }

        var newEnrolls = this.state.enrollments;
        this.setState({ enrollments: newEnrolls });
    }

    renderTableData() {
        if (this.state.enrollments.length === 0) {
            return;
        }

        return this.state.enrollments.map((course, index) => {
        const { professor_name, CRN, name, comments, availability, avgGpa, requirements_filled, prerequisites } = course //destructuring
        return (
            <tr key={CRN}>
                <td> 
                    <Button id="delete" onClick={this.deleteEnrollment.bind(this,course)}> Unenroll </Button> &nbsp;
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
            <NavBar/>
            <h1 id='title'> Enrollments Page </h1>
            {console.log(this.state.enrollments)}

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

export default Enrollments;