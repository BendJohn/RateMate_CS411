import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import './Table.css';
import { addEnrollment, basicSearch } from '../utils/apiWrapper';

export class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            displayedCourses: [],
            newCourse: "",
            showForm: false,
            crnToEdit: 0,

            search: {
                subject: "",
                number: 0,
                courseName: "",
                keyword: "",
                prof_lastname: "",
                rtg_lower: "",
                gpa_lower: ""
            }
        };

        this.updateInput = this.updateInput.bind(this);
        this.searchCourseByName = this.searchCourseByName.bind(this);
    }

    async componentDidMount() {
        const res = await basicSearch();
        console.log(res);
        this.setState({
            courses: res.data,
            displayedCourses: res.data
        })

        const r = await basicSearch("hi", 411, "Database Systems", "the", "Alawini", 0, 0);
        console.log(r);
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

    updateSearch(evt) {
        
    }

    async searchCourseByName(evt) {
        evt.preventDefault();
        if (this.state.newCourse !== undefined) {
            if (this.state.newCourse === "") {
                var courses = this.state.courses;
                this.setState({ displayedCourses: courses });
                return;
            }

            //const res = await basicSearch(this.state.newCourse);
            const res = await basicSearch("hi", 411, "Database Systems", "the", "Alawini", 0, 0);
            console.log(res);
            // var searchStr = this.state.newCourse;
            // var filtered = [];

            // for (var i = 0; i < this.state.courses.length; i++) {
            //     if (this.state.courses[i].name.toLowerCase().includes(searchStr.toLowerCase())) {
            //         filtered.push(this.state.courses[i]);
            //     }
            // }
            // this.setState({ displayedCourses: filtered })
        }
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
                    <input type="text" placeholder="Subject" onChange={this.updateInput}/>
                    <input type="number" placeholder="Course No." name="rating" min="100" max="600" step="1" onChange={this.updateInput}/>
                    <input type="text" placeholder="Course Name" onChange={this.updateInput}/>
                    <input type="text" placeholder="Keyword" onChange={this.updateInput}/>
                    <input type="text" placeholder="Professor Last Name" onChange={this.updateInput}/>
                    <input type="number" placeholder="Rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateInput}/>
                    <input type="number" placeholder="GPA" name="rating" min="0" max="4" step="0.01" onChange={this.updateInput}/>
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