import React from 'react';
import './ProfessorDashboard.css'
import { Button } from 'reactstrap';
import ReactSearchBox from 'react-search-box';
import { getAllProfessors, deleteProfessor, createProfessor } from '../utils/apiWrapper';

export class ProfessorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professors: [{professor_name: "Example", avg_rating: 4.0}],
            displayedProfessors: [{professor_name: "Example", avg_rating: 4.0}],
            newProfessor: '',
            newRating: 0,
            showDeleteError: false,
            showEditForm: false,
            professorToEdit: ""
        };
        this.addProfessor = this.addProfessor.bind(this);
        this.updateProfessorInput = this.updateProfessorInput.bind(this);
        this.updateRatingInput = this.updateRatingInput.bind(this);
        this.searchProfessor = this.searchProfessor.bind(this);
    }

    async componentDidMount() {
        const allProfessors = await getAllProfessors();
        this.setState({ professors: allProfessors, displayedProfessors: allProfessors });
    }
    
    async addProfessor(evt) {
        evt.preventDefault();
        if (this.state.newProfessor !== undefined && this.state.newRating !== undefined) {
            const res = await createProfessor(this.state.newProfessor, this.state.newRating);
            this.setState({showDeleteError: false});

            var newProf = { 
                professor_name: res.data.professor_name, 
                avg_rating: res.data.avg_rating 
            }

            var allProfs = this.state.professors;
            allProfs.push(newProf);

            this.setState({
                professors: allProfs,
                displayedProfessors: allProfs
            });
        }
    }

    updateProfessorInput(evt) {
        const val = evt.target.value;
        var profs = this.state.professors;
        var rating = this.state.newRating;

        this.state = ({
            professors: profs,
            displayedProfessors: profs,
            newProfessor: val,
            newRating: rating
        });
    }

    updateRatingInput(evt) {
        const rating = evt.target.value;
        const val = this.state.newProfessor;
        const profs = this.state.professors;
        const deleteError = this.state.showDeleteError;
        const editForm = this.state.showEditForm;
        const pToEdit = this.state.professorToEdit;

        this.state = ({
            professors: profs,
            displayedProfessors: profs,
            newProfessor: val,
            newRating: rating,
            showDeleteError: deleteError,
            showEditForm: editForm,
            professorToEdit: pToEdit
        });
    }

    async deleteProfessor(profName) {
        var profs = this.state.professors;

        if (profs.length <= 1) {
            this.setState({showDeleteError: true});
            return;
        }

        for (var i = 0; i < profs.length; i++) {
            if (profs[i].professor_name === profName) {
                await deleteProfessor(profs[i].professor_name);
                profs.splice(i, 1);
                break;
            }
        }

        var newProfs = this.state.professors;
        this.setState({ professors: newProfs, displayedProfessors: newProfs });
    }

    showEditForm(profName) {
        this.setState({ showEditForm: true, professorToEdit: profName });
    }

    editProfessor(name) {
        if (this.state.newProfessor !== undefined && this.state.newRating !== undefined) {
            var profs = this.state.professors;
            for (var i = 0; i < profs.length; i++) {
                if (profs[i].professor_name === name) {
                    profs[i].professor_name = this.state.newProfessor;
                    profs[i].avg_rating = this.state.newRating;
                }
            }
            this.setState({ professors: profs, displayedProfessors: profs });
        }
    }

    searchProfessor(evt) {
        evt.preventDefault();
        if (this.state.newProfessor !== undefined) {
            var searchStr = this.state.newProfessor;
            var filteredProfs = [];

            for (var i = 0; i < this.state.professors.length; i++) {
                if (this.state.professors[i].professor_name.toLowerCase().includes(searchStr.toLowerCase())) {
                    filteredProfs.push(this.state.professors[i]);
                }
            }

            this.setState({ displayedProfessors: filteredProfs })
        }
    }


    renderTableData() {
        if (this.state.displayedProfessors.length === 0) {
            return;
        }

        return this.state.displayedProfessors.map((professor, index) => {
        const { professor_name, avg_rating } = professor //destructuring
        return (
            <tr key={professor_name}>
                <td> <Button id="delete" onClick={this.deleteProfessor.bind(this, professor_name)}> Delete </Button> &nbsp;
                     <Button id="edit" onClick={this.showEditForm.bind(this, professor_name)}> Edit </Button> &nbsp;
                    {professor_name} 
                    {(this.state.showEditForm && (this.state.professorToEdit===professor_name)) 
                        ? ( <form onSubmit={this.editProfessor.bind(this, professor_name)}>
                                <input type="text" onChange={this.updateProfessorInput}/>
                                <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRatingInput}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        ) : (<></>)}
                </td>
                <td>{avg_rating} </td>
            </tr>
        )
        })
    }
    
    render() {
        return (
            <div>
                <h1 id='title'>Professors</h1>

                <form onSubmit={this.searchProfessor}>
                    <input type="text" onChange={this.updateProfessorInput}/>
                    <input type="submit" value="Search"/>
                </form>

                <table id='professors'>
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
                    (<h3> Cannot delete. There needs to be at least 1 professor in table. </h3>) : (<> </>)}
            </div>
        )
    }
  }

  export default ProfessorDashboard;