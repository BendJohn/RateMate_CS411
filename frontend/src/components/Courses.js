import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import './Table.css';
import { addEnrollment } from '../utils/apiWrapper';

export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [
                {
                    professor_name: "John Smith", 
                    CRN: 41758, 
                    name: "Intro to CS",
                    comments: "Comments!", 
                    availability: true,
                    avgGpa: 3.33,
                    requirements_filled: "Science Gen Ed",
                    prerequisites: "123"
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
            displayedCourses: [
                {
                    professor_name: "John Smith", 
                    CRN: 41758, 
                    name: "Intro to CS",
                    comments: "Comments!", 
                    availability: true,
                    avgGpa: 3.33,
                    requirements_filled: "Science Gen Ed",
                    prerequisites: "123"
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
            newCourse: "",
            showForm: false,
            crnToEdit: 0
        };

        this.updateInput = this.updateInput.bind(this);
        this.searchCourseByName = this.searchCourseByName.bind(this);
    }

    updateInput(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newCourse: val
        });
    }

    async searchCourseByName(evt) {
        evt.preventDefault();
        console.log(this.state);
        if (this.state.newCourse !== undefined) {
            if (this.state.newCourse === "") {
                var courses = this.state.courses;
                this.setState({ displayedCourses: courses });
                return;
            }

            // const res = await getProfessorByName(this.state.newProfessor);
            var searchStr = this.state.newCourse;
            var filtered = [];

            for (var i = 0; i < this.state.courses.length; i++) {
                if (this.state.courses[i].name.toLowerCase().includes(searchStr.toLowerCase())) {
                    filtered.push(this.state.courses[i]);
                }
            }
            this.setState({ displayedCourses: filtered })
        }
    }

    showForm(crn) {
        this.setState({ showForm: true, crnToEdit: crn });
    }

    async addEnrollment(crn) {
        var netid = this.state.newCourse;
        console.log(this.state.newCourse);
        await addEnrollment(netid, crn);
    }

    renderTableData() {
        if (this.state.displayedCourses.length === 0) {
            return;
        }

        return this.state.displayedCourses.map((course, index) => {
        const { professor_name, CRN, name, comments, availability, avgGpa, requirements_filled, prerequisites } = course //destructuring
        return (
            <tr key={CRN}>
                <td> 
                    <Button id="enroll" onClick={this.showForm.bind(this, CRN)}> Enroll </Button> &nbsp;
                    {CRN}

                    {(this.state.showForm && (this.state.crnToEdit===CRN))
                        ? ( <form onSubmit={this.addEnrollment.bind(this, CRN)}>
                                <text> Net ID </text>
                                <input type="text" onChange={this.updateInput}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        ) : (<></>)}
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
            <div>
                <NavBar/>

                <h1 id='title'>Courses</h1>

                <form onSubmit={this.searchCourseByName}>
                    <input type="text" onChange={this.updateInput}/>
                    <input type="submit" value="Search"/>
                </form>

                <table id='table'>
                    <tbody>
                        <tr> <th> CRN </th> <th> Name </th> <th> Professor </th> <th> Avg GPA </th> <th> Availability </th>
                        <th> Requirements Filled </th> <th> Prerequisites </th> <th> Comments </th> </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Courses;