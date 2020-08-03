import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import './Table.css';
import { addEnrollmentExistingUser, addEnrollmentNewUser, basicSearch } from '../utils/apiWrapper';

export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            displayedCourses: [],
            newNetId: "",
            newName: "",
            newStanding: "",
            newDept: "",
            crnToEdit: 0,
            showForm: false,
            

            newSubject: "",
            newNumber: 0,
            newCourseName: "",
            newKeyword: "",
            newProfessor: "",
            newRating: 0.0,
            newGPA: 0.0
        };

        this.updateInput = this.updateInput.bind(this);
        this.updateStanding = this.updateStanding.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
        this.updateName = this.updateName.bind(this);
        this.addEnrollment = this.addEnrollment.bind(this);

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

        if ( (newSubject === "" || newSubject === undefined)
            && (newNumber === "" || newNumber === undefined)
            && (newCourseName === "" || newCourseName === undefined)
            && (newKeyword === "" || newKeyword === undefined)
            && (newProfessor === "" || newProfessor === undefined)
            && (newRating === "" || newRating === undefined)
            && (newGPA === "" || newGPA === undefined)) {
            var allCourses = this.state.courses;
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
        const netid = this.state.newNetId;
        const name = this.state.newName;
        const standing = this.state.newStanding;
        const dept = this.state.newDept;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;
        const crn = this.state.crnToEdit;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newNetId: val,
            newName: name,
            newStanding: standing,
            newDept: dept,
            crnToEdit: crn
        });
    }

    updateName(evt) {
        const val = evt.target.value;
        const netid = this.state.newNetId;
        const standing = this.state.newStanding;
        const dept = this.state.newDept;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;
        const crn = this.state.crnToEdit;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newNetId: netid,
            newName: val,
            newStanding: standing,
            newDept: dept,
            crnToEdit: crn
        });
    }

    updateStanding(evt) {
        const val = evt.target.value;
        const netid = this.state.newNetId;
        const name = this.state.newName;
        const dept = this.state.newDept;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;
        const crn = this.state.crnToEdit;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newNetId: netid,
            newName: name,
            newStanding: val,
            newDept: dept,
            crnToEdit: crn
        });
    }

    updateDepartment(evt) {
        const val = evt.target.value;
        const netid = this.state.newNetId;
        const name = this.state.newName;
        const standing = this.state.newStanding;
        const courses = this.state.courses;
        const displayed = this.state.displayedCourses;
        const crn = this.state.crnToEdit;

        this.state = ({
            courses: courses,
            displayedCourses: displayed,
            newNetId: netid,
            newName: name,
            newStanding: standing,
            newDept: val,
            crnToEdit: crn
        });
    }

    showForm(crn) {
        this.setState({ showForm: true, crnToEdit: crn });
    }

    async addEnrollment(evt) {
        evt.preventDefault();
        var netid = this.state.newNetId;
        var name = this.state.newName;
        var standing = this.state.newStanding;
        var dept = this.state.newDept;
        var crn = this.state.crnToEdit;

        if ((name===undefined || name==="") &&
            (standing===undefined || standing==="") &&
            (dept===undefined || dept==="")) {
            await addEnrollmentExistingUser(netid, crn);
        } else {
            // New user
            await addEnrollmentNewUser(netid, name, standing, dept, crn);
        }
        
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
                    {CRN} &ensp;
                    <Button id="enroll" onClick={this.showForm.bind(this, CRN)}> Enroll </Button> &nbsp;

                    {(this.state.showForm && (this.state.crnToEdit===CRN))
                        ? ( <form onSubmit={this.addEnrollment}>
                                <input type="text" placeholder="Net ID" onChange={this.updateInput}/>
                                <input type="text" placeholder="Name" onChange={this.updateName}/>
                                <input type="text" placeholder="Standing" onChange={this.updateStanding}/>
                                <input type="text" placeholder="Department" onChange={this.updateDepartment}/>
                                <div> <input type="submit" value="Submit"/> </div>
                                <div> <text> (Only fill out "Net ID" if existing user) </text> </div>
                                
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