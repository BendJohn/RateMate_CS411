import React from 'react';
import { NavBar } from './NavBar';
import { Button, Nav } from 'reactstrap';
import './Table.css';

export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [
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
                    CRN: 123, 
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
            enrollments: ["props from course"],
            newCourse: "",
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

    // async componentDidMount() {
    //     const allCourses = await getallCourses();
    //     this.setState({ courses: allCourses, displayedCourses: allCourses });
    // }

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

    renderTableData() {
        if (this.state.displayedCourses.length === 0) {
            return;
        }

        return this.state.displayedCourses.map((course, index) => {
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
            <div>
                <NavBar
                    enrollments={this.state.enrollments}
                />

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