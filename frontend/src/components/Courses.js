import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import './Table.css';
import { addEnrollment, basicSearch } from '../utils/apiWrapper';
import { Form } from './Form';

export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            displayedCourses: [],
            newCourse: "",
            showForm: false,
            crnToEdit: 0,

            newSubject: "",
            newNumber: 0,
            newCourseName: "",
            newKeyword: "",
            newProfessor: "",
            newRating: 0.0,
            newGPA: 0.0
        };

        this.updateInput = this.updateInput.bind(this);

        this.updateSubject = this.updateSubject.bind(this);
        this.updateNumber = this.updateNumber.bind(this);
        this.updateCourseName = this.updateCourseName.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
        this.updateProfessor = this.updateProfessor.bind(this);
        this.updateRating = this.updateRating.bind(this);
        this.updateGPA = this.updateGPA.bind(this);
        this.searchCourseByName = this.searchCourseByName.bind(this);
    }

    updateSubject(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newSubject: val
        });
    }

    updateNumber(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newNumber: val
        });
    }

    updateCourseName(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newCourseName: val
        });
    }

    updateKeyword(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newKeyword: val
        });
    }

    updateProfessor(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newProfessor: val
        });
    }

    updateRating(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newRating: val
        });
    }

    updateGPA(evt) {
        const val = evt.target.value;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newGPA: val
        });
    }

    async searchCourseByName(evt) {
        evt.preventDefault();
        const {newSubject, newNumber, newCourseName, newKeyword, newProfessor, newRating, newGPA} = this.state; 

        console.log(this.state);

        if ( (newSubject === "" || newSubject === undefined)
            && (newNumber === "" || newNumber === undefined)
            && (newCourseName === "" || newCourseName === undefined)
            && (newKeyword === "" || newKeyword === undefined)
            && (newProfessor === "" || newProfessor === undefined)
            && (newRating === "" || newRating === undefined)
            && (newGPA === "" || newGPA === undefined)) {
            var allCourses = this.state.courses;
            
            console.log(this.state);

            this.setState({ displayedCourses: allCourses });
            return;
        }

        const res = await basicSearch(newSubject, newNumber, newCourseName, newKeyword, newProfessor, newRating, newGPA);
        var newClasses = res.data;
        this.setState({ displayedCourses: newClasses });
    }

    async componentDidMount() {
        const res = await basicSearch();
        this.setState({
            courses: res.data,
            displayedCourses: res.data
        })
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

    showForm(crn) {
        this.setState({ showForm: true, crnToEdit: crn });
    }

    async addEnrollment(crn) {
        var netid = this.state.newCourse;
        await addEnrollment(netid, crn);
    }

    renderTableData() {
        if (this.state.displayedCourses.length === 0) {
            return;
        }

        return this.state.displayedCourses.map((course, index) => {
        const { subject, number, name, description, CRN, avg_gpa, firstname, lastname, avg_rating } = course //destructuring
        return (
            <tr key={CRN}>
                <td> 
                    {CRN}
                    <Button id="enroll" onClick={this.showForm.bind(this, CRN)}> Enroll </Button> &nbsp;

                    {(this.state.showForm && (this.state.crnToEdit===CRN))
                        ? ( <form onSubmit={this.addEnrollment.bind(this, CRN)}>
                                <text> Net ID </text>
                                <input type="text" onChange={this.updateInput}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        ) : (<></>)}
                </td>
                <td>{subject} </td>
                <td>{number} </td>
                <td>{name} </td>
                <td> {description} </td>
                <td>{avg_gpa} </td>
                <td>{firstname}  {lastname} </td>
                <td>{avg_rating} </td>
            </tr>
        )})
    }
    
    render() {
        return (
            <div>
                <NavBar/>

                <h1 id='title'>Courses</h1>

                <form onSubmit={this.searchCourseByName}>
                    <input type="text" placeholder="Subject" onChange={this.updateSubject}/>
                    <input type="number" placeholder="Number" name="rating" min="100" max="600" step="1" onChange={this.updateNumber}/>
                    <input type="text" placeholder="Course Name" onChange={this.updateCourseName}/>
                    <input type="text" placeholder="Keyword" onChange={this.updateKeyword}/>
                    <input type="text" placeholder="Professor Last Name" onChange={this.updateProfessor}/>
                    <input type="number" placeholder="Rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRating}/>
                    <input type="number" placeholder="GPA" name="rating" min="0" max="4" step="0.01" onChange={this.updateGPA}/>
                    <input type="submit" value="Search"/>
                </form>

                <table id='table'>
                    <tbody>
                        <tr> <th> CRN </th> <th> Subject </th> <th> Number </th> <th> Name </th> <th> Description </th>
                        <th> Average GPA </th> <th> Professor </th> <th> Avg Rating </th> </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Courses;