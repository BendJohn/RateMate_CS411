import React, { Component } from 'react';
import './ProfessorDashboard.css'
import { Button } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export class ProfessorDashboard extends Component {
   constructor(props) {
      super(props);

      this.state = {
         professors: [
            { name: 'Ben', avg_rating: 5.0 },
            { name: 'Danielle', avg_rating: 4.7 },
            { name: 'Andrew', avg_rating: 3.5 },
            { name: 'Julia', avg_rating: 4.2 }
         ]
      }
   }

   deleteProfessor() {
       console.log("YO");
   }

   editProfessor() {
       console.log("edit");
   }

   addProfessor(newProfessor) {
       var professors = this.state.professors;
       this.setState({
           professors: professors.append(newProfessor)
       })
   }

    renderTableData() {
        return this.state.professors.map((professor, index) => {
        const { id, name, avg_rating } = professor //destructuring
        return (
            <tr key={id}>
                <td> <Button id="delete" onClick={this.deleteProfessor}> Delete </Button> 
                     <Button id="edit" onClick={this.editProfessor}> Edit </Button> 
                    {name} </td>
                <td>{avg_rating} </td>
            </tr>
        )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.professors[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        return (
           <div>
              <h1 id='title'>Professors</h1>
              <table id='professors'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                    <tr>
                        <td> <Input placeholder="Add professor" /> </td>
                        <td> <Button onClick={this.addProfessor}> Add Professor </Button> </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        )
     }
}

export default ProfessorDashboard; //exporting a component make it reusable and this is the beauty of react