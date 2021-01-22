import React, { Component } from 'react';
import { Button, Grid, TextField, Paper } from '@material-ui/core';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {InputLabel, MenuItem, Select} from '@material-ui/core'
import '../css/addBug.css'

const styles = {
    addbugg: {
        textAlign: 'center'

    }
}

class AddBug extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            severity: '',
            priority: '',
            linkBug: ''
        }
        //cred ca trebuie modificat 
        this.changeHandler = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        this.projectID = this.props.match.params.id;
        console.log(this.projectID);

        this.goBack = () => {
            this.props.history.push("/dashboard/getAllProjects")
        }

        this.onAddBug = () => {
            if (this.state.description && this.state.severity
                && this.state.priority && this.state.linkBug) {
                axios.post('/api/bug/createBug', { description: this.state.description, 
                    severity: this.state.severity, 
                    priority: this.state.priority, 
                    linkBug: this.state.linkBug, 
                    status: "unsolved",
                    projectID: this.projectID })
                    .then((res) => {
                        console.log(res.data);
                        this.goBack();
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
            }
            else {
                this.setState({ openError: true })
            }
        }



    }
    render() {
        return (
            <>
                 
            <Grid container direction="column" alignItems="center" spacing={1}>
            <h1>Add bug</h1>
                <Grid item xs={6} >
                    <TextField 
                        name="description"
                        multiline
                        label="Description"
                        value={this.state.description}
                        onChange={this.changeHandler}
                        
                    />
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="selectLabel">Severity</InputLabel>
                <Select
                className="selects"
                name="severity"
                labelId="selectLabel"
                id="select"
                value={this.state.severity}
                onChange={this.changeHandler}
                >
                <MenuItem value="low">low</MenuItem>
                <MenuItem value="medium">medium</MenuItem>
                <MenuItem value="high">high</MenuItem>
                </Select>
                </Grid>

                <Grid item xs={12}>
                <InputLabel id="selectLabel">Priority</InputLabel>
                <Select
                className="selects"
                name="priority"
                labelId="selectLabel"
                id="select"
                value={this.state.priority}
                onChange={this.changeHandler}
                >
                <MenuItem value="immediate">immediate</MenuItem>
                <MenuItem value="important">important</MenuItem>
                <MenuItem value="low">low</MenuItem>
                </Select>
                </Grid>

                <Grid item xs={6} >
                <TextField multiline
                    name="linkBug"
                    value={this.state.linkBug}
                    onChange={this.changeHandler}
                    label="LinkBug"
                />
                </Grid>

                <Grid item xs={6}>
                <Button variant="contained" size="medium" color="primary" onClick={this.onAddBug} > Add</Button>
                <Button variant="contained" size="medium" color="primary" onClick={this.goBack} >Cancel</Button>
                </Grid>
           </Grid>
           </>
        
        )
    }
}
export default withRouter(AddBug);