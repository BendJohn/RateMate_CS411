import React from 'react';
import history from '../utils/history';
import { Button } from 'reactstrap';
import { addEnrollment, basicSearch } from '../utils/apiWrapper';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        newCourse: ""
    }

    this.updateInput = this.updateInput.bind(this);
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


  render() {
    return (
      <>
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
      </>
    )
  }
}

export default Form;
