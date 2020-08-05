import React from 'react';
import { NavBar } from './NavBar';
import { Button } from 'reactstrap';
import abdu_gif from '../utils/abdu.gif';
import { addEnrollmentExistingUser, getRecsByNetID } from '../utils/apiWrapper';

export class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // List of courses
            recs: [],
            showGif: false,
            showForm: false,
            netID: "",
            crnToEdit: 0
        };

        this.updateInput = this.updateInput.bind(this);
        this.addEnrollment = this.addEnrollment.bind(this);
    }

    async addEnrollment(evt) {
        evt.preventDefault();
        var netid = this.state.newNetId;
        var crn = this.state.crnToEdit;
        await addEnrollmentExistingUser(netid, crn);
    }

    showGIF() {
        var curr = this.state.showGif;
        if (curr) {
            this.setState({ showGif: false });
        } else {
            this.setState({ showGif: true });
        }
    }

    showForm(crn) {
        this.setState({ showForm: true, crnToEdit: crn });
    }

    updateInput(evt) {
        const val = evt.target.value;
        const crn = this.state.crnToEdit;
        const r = this.state.recs;

        this.state = ({
            netID: val,
            crnToEdit: crn,
            recs: r
        });
    }

    async getRecByNetId(evt) {
        evt.preventDefault();
        const netid = this.state.netID;
        if (netid !== undefined) {
            if (netid === "") {
                this.setState({ recs: [] });
                return;
            }
            const res = await getRecsByNetID(netid);
            console.log(res);
            this.setState({ recs: res });
        }
    }

    renderTableData() {
        if (this.state.recs.length === 0) {
            return;
        }

        return this.state.recs.map((course, index) => {
        const { subject, number, name, description, CRN, avg_gpa, firstname, lastname, avg_rating } = course //destructuring
        return (
            <tr key={CRN}>
                <td> 
                    {CRN} &ensp;
                    <Button id="enroll" onClick={this.showForm.bind(this, CRN)}> Enroll </Button> &nbsp;

                    {(this.state.showForm && (this.state.crnToEdit===CRN))
                        ? ( <form onSubmit={this.addEnrollment}>
                                <input type="text" placeholder="Net ID" onChange={this.updateInput}/>
                                <div> <input type="submit" value="Submit"/> </div>
                            </form>
                        ) : (<></>)}
                </td>
                <td>{subject} </td>
                <td>{number} </td>
                <td>{name} </td>
                <td>{avg_gpa} </td>
                <td>{firstname}  {lastname} </td>
                <td>{avg_rating} </td>
            </tr>
        )})
    }


    render() {
        return (
            <>
                <NavBar/>

                <h1 id='title'> Recommendations </h1>

                <h1 id='title'> <Button style={{backgroundColor: '#c4fffc'}} onClick={this.showGIF.bind(this)}> Are you excited for learning? </Button> </h1> &ensp;&ensp;&ensp;&ensp;
                <h1 id='title'> {this.state.showGif ?  (<img src={abdu_gif}/>) : (<> </>)} </h1>

                <form onSubmit={this.getRecByNetId.bind(this)}>
                    <input type="text" onChange={this.updateInput}/>
                    <input type="submit" value="Search"/>
                </form>

                <table id='table'>
                    <tbody>
                        <tr> <th> CRN </th> <th> Subject </th> <th> Number </th> <th> Name </th>
                            <th> Average GPA </th> <th> Professor </th> <th> Avg Rating </th> </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Recommendations;