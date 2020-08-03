import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import abdu_gif from '../utils/abdu.gif';

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
            ],

            showGif: false
        };
    }

    // async componentDidMount() {
    //     // get all enrollments
    // }

    async addEnrollment(course) {
        // await addEnrollment();
        var oldEnrollments = this.state.enrollments;
        oldEnrollments.push(course);
        this.setState({ enrollments: oldEnrollments });
        console.log(this.state.enrollments);
    }

    showGIF() {
        var curr = this.state.showGif;
        if (curr) {
            this.setState({ showGif: false });
        } else {
            this.setState({ showGif: true });
        }
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
                    <Button id="enroll" onClick={this.addEnrollment.bind(this, course)}> Enroll </Button> &nbsp;
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

                <Button onClick={this.showGIF.bind(this)}> Are you excited for learning? </Button> &ensp;&ensp;&ensp;&ensp;
                {this.state.showGif ?  (<img src={abdu_gif}/>) : (<> </>)}

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