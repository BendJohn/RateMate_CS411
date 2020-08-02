import React from 'react';
import history from '../utils/history';
import { Button } from 'reactstrap';
import { addEnrollment, basicSearch } from '../utils/apiWrapper';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        newSubject: "",
        newNumber: 0,
        newCourseName: "",
        newKeyword: "",
        newProfessor: "",
        newRating: 0.0,
        newGPA: 0.0
    }

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
        this.state = ({
            newSubject: val
        });
    }

    updateNumber(evt) {
        const val = evt.target.value;
        this.state = ({
            newNumber: val
        });
    }

    updateCourseName(evt) {
        const val = evt.target.value;
        this.state = ({
            newCourseName: val
        });
    }

    updateKeyword(evt) {
        const val = evt.target.value;
        this.state = ({
            newKeyword: val
        });
    }

    updateProfessor(evt) {
        const val = evt.target.value;
        this.state = ({
            newProfessor: val
        });
    }

    updateRating(evt) {
        const val = evt.target.value;
        this.state = ({
            newRating: val
        });
    }

    updateGPA(evt) {
        const val = evt.target.value;
        this.state = ({
            newGPA: val
        });
    }

    async searchCourseByName(evt) {
        evt.preventDefault();
        const {newSubject, newNumber, newCourseName, newKeyword, newProfessor, newRating, newGPA} = this.state; 

        if (newSubject === "" && newNumber === "" && newCourseName === "" && newKeyword === "" && 
            newProfessor === "" && newRating === "" && newGPA === "") {
            // Return all courses
            return;
        }

        
        //const res = await basicSearch(this.state.newCourse);
        const res = await basicSearch(newSubject, newNumber, newCourseName, newKeyword, newProfessor, newRating, newGPA);
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


  render() {
    return (
      <>
        <form onSubmit={this.searchCourseByName}>
            <input type="text" placeholder="Subject" onChange={this.updateSubject}/>
            <input type="number" placeholder="Course No." name="rating" min="100" max="600" step="1" onChange={this.updateNumber}/>
            <input type="text" placeholder="Course Name" onChange={this.updateCourseName}/>
            <input type="text" placeholder="Keyword" onChange={this.updateKeyword}/>
            <input type="text" placeholder="Professor Last Name" onChange={this.updateProfessor}/>
            <input type="number" placeholder="Rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRating}/>
            <input type="number" placeholder="GPA" name="rating" min="0" max="4" step="0.01" onChange={this.updateGPA}/>
            <input type="submit" value="Search"/>
        </form>
      </>
    )
  }
}

export default Form;
