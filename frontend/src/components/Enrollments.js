import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import { getEnrollmentsByNetID, deleteEnrollment } from '../utils/apiWrapper';

export class Enrollments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            netid: ""
        };

        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(evt) {
        console.log(evt);
        const val = evt.target.value;
        var enr = this.state.enrollments;

        this.state = ({
            enrollments: enr,
            netid: val
        });
    }

    async getAllEnrollmentsByNetID(evt) {
        evt.preventDefault();
        if (this.state.netid !== undefined) {
            if (this.state.netid === "") {
                this.setState({ enrollments: [] });
                return;
            }
            const res = await getEnrollmentsByNetID(this.state.netid);
            this.setState({ enrollments: res });
        }
    }

    
    async deleteEnrollment(enr) {
        var enrolls = this.state.enrollments;
        for (var i = 0; i < enrolls.length; i++) {
            if (enrolls[i].crn === enr.crn) {
                await deleteEnrollment(enr.netid, enr.crn);
                enrolls.splice(i, 1);
                break;
            }
        }
        var newEnrolls = this.state.enrollments;
        this.setState({ enrollments: newEnrolls });
    }

    renderTableData() {
        if (this.state.enrollments !== null) {
            if (this.state.enrollments.length === 0) {
                return;
            }
    
            return this.state.enrollments.map((enrollment, index) => {
            const { subject, number, crn } = enrollment //destructuring
            return (
                <tr key={crn}>
                    <td> 
                        <Button id="delete" onClick={this.deleteEnrollment.bind(this,enrollment)}> Unenroll </Button> &nbsp;
                        {crn}
                    </td>
                    <td>{subject} </td>
                    <td>{number} </td>
                </tr>
            )})
        }
    }

    render() {
        return (
            <>
            <NavBar/>
            <h1 id='title'> Enrollments Page </h1>

            <form onSubmit={this.getAllEnrollmentsByNetID.bind(this)}>
                <input type="text" onChange={this.updateInput}/>
                <input type="submit" value="Search"/>
            </form>

            <table id='table'>
                    <tbody>
                        <tr> <th> CRN </th> <th> Subject </th> <th> Number </th> </tr>
                        {this.renderTableData()}
                    </tbody>
            </table>
            </>
        )
    }
}

export default Enrollments;