import React from 'react';
import './Table.css';
import { Button } from 'reactstrap';
import { getAllProfessors, deleteProfessor, createProfessor, getProfessorByName, editProfessor } from '../utils/apiWrapper';
import { NavBar } from "./NavBar";


export class ProfessorDashboard extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     professors: [{firstname: "Example", lastname: "Example", avg_rating: 4.0}],
        //     displayedProfessors: [{firstname: "Example", lastname: "Example", avg_rating: 4.0}],
        //     newProfessor: '',
        //     newRating: 0,
        //     showDeleteError: false,
        //     showEditForm: false,
        //     professorToEdit: ""
        // };
        // this.addProfessor = this.addProfessor.bind(this);
        // this.updateProfessorInput = this.updateProfessorInput.bind(this);
        // this.updateRatingInput = this.updateRatingInput.bind(this);
        // this.searchProfessorByName = this.searchProfessorByName.bind(this);
    }

    // async componentDidMount() {
    //     const allProfessors = await getAllProfessors();
    //     this.setState({ professors: allProfessors, displayedProfessors: allProfessors });
    // }

    // async addProfessor(evt) {
    //     evt.preventDefault();
    //     if (this.state.newProfessor !== undefined && this.state.newRating !== undefined) {
    //         const res = await createProfessor(this.state.newProfessor, this.state.newRating);
    //         this.setState({showDeleteError: false});

    //         var newProf = { 
    //             professor_name: res.data.professor_name, 
    //             avg_rating: res.data.avg_rating 
    //         }

    //         var allProfs = this.state.professors;
    //         allProfs.push(newProf);

    //         this.setState({
    //             professors: allProfs,
    //             displayedProfessors: allProfs
    //         });
    //     }
    // }

    // updateProfessorInput(evt) {
    //     const val = evt.target.value;
    //     var profs = this.state.professors;
    //     var rating = this.state.newRating;

    //     this.state = ({
    //         professors: profs,
    //         displayedProfessors: profs,
    //         newProfessor: val,
    //         newRating: rating
    //     });
    // }

    // updateRatingInput(evt) {
    //     const rating = evt.target.value;
    //     const val = this.state.newProfessor;
    //     const profs = this.state.professors;
    //     const deleteError = this.state.showDeleteError;
    //     const editForm = this.state.showEditForm;
    //     const pToEdit = this.state.professorToEdit;

    //     this.state = ({
    //         professors: profs,
    //         displayedProfessors: profs,
    //         newProfessor: val,
    //         newRating: rating,
    //         showDeleteError: deleteError,
    //         showEditForm: editForm,
    //         professorToEdit: pToEdit
    //     });
    // }

    // async deleteProfessor(profName) {
    //     var profs = this.state.professors;

    //     if (profs.length <= 1) {
    //         this.setState({showDeleteError: true});
    //         return;
    //     }

    //     for (var i = 0; i < profs.length; i++) {
    //         if (profs[i].professor_name === profName) {
    //             await deleteProfessor(profs[i].professor_name);
    //             profs.splice(i, 1);
    //             break;
    //         }
    //     }

    //     var newProfs = this.state.professors;
    //     this.setState({ professors: newProfs, displayedProfessors: newProfs });
    // }

    // showEditForm(profName) {
    //     this.setState({ showEditForm: true, professorToEdit: profName });
    // }

    // async editProfessor(profName) {
    //     await editProfessor(profName, this.state.newRating);
    //     for (var i = 0; i < this.state.professors.length; i++) {
    //         if (this.state.professors[i].professor_name === profName) {
    //             this.state.professors[i].avg_rating = this.state.newRating;
    //         }
    //     }
    //     const profs = this.state.professors;
    //     this.setState({displayedProfessors: profs});
    // }

    // async searchProfessorByName(evt) {
    //     evt.preventDefault();
    //     if (this.state.newProfessor !== undefined) {
    //         if (this.state.newProfessor === "") {
    //             var profs = this.state.professors;
    //             this.setState({ displayedProfessors: profs });
    //             return;
    //         }

    //         const res = await getProfessorByName(this.state.newProfessor);
            
    //         var displayed = [];
    //         for (var i = 0; i < res.length; i++) {
    //             displayed.push({firstname: res[i].firstname, lastname: res[i].lastname, avg_rating: res[i].avg_rating })
    //         }
    //         this.setState({ displayedProfessors: displayed});
    //     }
    // }

    // renderTableData() {
    //     if (this.state.displayedProfessors.length === 0) {
    //         return;
    //     }

    //     return this.state.displayedProfessors.map((professor, index) => {
    //     const { professor_name, avg_rating } = professor //destructuring
    //     return (
    //         <tr key={professor_name}>
    //             <td> <Button id="delete" onClick={this.deleteProfessor.bind(this, professor_name)}> Delete </Button> &nbsp;
    //                  <Button id="edit" onClick={this.showEditForm.bind(this, professor_name)}> Edit Rating </Button> &nbsp;
    //                 {professor_name}
    //                 {(this.state.showEditForm && (this.state.professorToEdit===professor_name))
    //                     ? ( <form onSubmit={this.editProfessor.bind(this, professor_name)}>
    //                             <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRatingInput}/>
    //                             <input type="submit" value="Submit"/>
    //                         </form>
    //                     ) : (<></>)}
    //             </td>
    //             <td>{avg_rating} </td>
    //         </tr>
    //     )
    //     })
    // }
    
    render() {
        return (
            <div>
                <NavBar/>
                <h1 id='title'>Professors</h1>
{/* 
                <form onSubmit={this.searchProfessorByName}>
                    <input type="text" onChange={this.updateProfessorInput}/>
                    <input type="submit" value="Search"/>
                </form>

                <table id='table'>
                    <tbody>
                        <tr> <th> Professor Name </th> <th> Rating </th> </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>

                <form onSubmit={this.addProfessor}>
                    <input type="text" onChange={this.updateProfessorInput}/>
                    <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRatingInput}/>
                    <input type="submit" value="Add Professor"/>
                </form>

                {this.state.showDeleteError ?
                    (<h3> Cannot delete. There needs to be at least 1 professor in table. </h3>) : (<> </>)} */}
            </div>
        )
    }
  }

  export default ProfessorDashboard;
