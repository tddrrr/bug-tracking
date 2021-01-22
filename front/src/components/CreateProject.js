import React, {Component} from 'react'
import '../css/register.css'
import axios from 'axios'
import {TextField, Button, Icon, Grid, Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom'

class CreateProject extends Component{
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            repo: ''
        }

        this.changeHandler=(e) => {
            this.setState({
                [e.target.name]: e.target.value
            }) 
        }

        this.onCreate = (e) => {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
            if (this.state.name && this.state.repo) {
                axios.post('/api/project/createProject', {name: this.state.name, description: this.state.description, 
                    repo: this.state.repo})
                    .then((res) => {console.log(res.data);
                        this.setState({openSuccess: true})
                        props.history.push("/dashboard")
                    })
                    .catch(error => {console.log(error.response.data);
                                    toast.error(`${error.response.data.message}`);}) //cu toastify
            } else {
                this.setState({openError: true})
            }
        }

        this.handleCloseSuccess = () => {
            this.setState({openSuccess: false})
        }
        this.handleCloseError = () => {
            this.setState({openError: false})
        }

    }
    render() {
        return(
            <div>
            <h1 className="registerTitle">Create New Project</h1>
            <br></br><br></br>
            <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField name="name" onChange={this.changeHandler} value={this.state.name} id="outlined-basic" autoFocus required label="Name" variant="outlined" />
            </Grid><br></br>
            <Grid item xs={12} sm={6}>
            <TextField name="description" onChange={this.changeHandler} value={this.state.description} id="outlined-basic" autoFocus label="Description" variant="outlined" />
            </Grid><br></br>
            <Grid item xs={12}>
            <TextField name="repo" onChange={this.changeHandler} value={this.state.repo} id="outlined-basic" autoFocus required label="Repository" variant="outlined" />
            </Grid>
            <br></br><br></br>
            <Button variant="contained" size="medium" color="primary"  onClick={this.onCreate}>
                Create
            </Button>
            
            </Grid>
            
            </div>
        )
    }
}

export default withRouter(CreateProject)
