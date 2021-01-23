import React, {Component} from 'react'
import '../css/register.css'
import axios from 'axios'
import {TextField, Button, Icon, Grid, Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom'
import {InputLabel, MenuItem, Select} from '@material-ui/core'

class CreateProject extends Component{
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            repo: '',
            Team: '',
            Teams: []
        }

        this.changeHandler=(e) => {
            this.setState({
                [e.target.name]: e.target.value
            }) 
        }

        this.onCreate = (e) => {
            if (this.state.name && this.state.repo && this.state.description && this.state.Team) {
                axios.post('/api/project/createProject', {name: this.state.name, description: this.state.description, 
                    repo: this.state.repo,
                    teamID: this.state.Team
                })
                    .then((res) => {console.log(res.data);
                        this.setState({openSuccess: true})
                        props.history.push("/dashboard")
                    })
                    .catch(error => {console.log(error.response.data);
                                    toast.error(`${error.response.data}`);}) //cu toastify
            } else {
                toast.error("You must complete all fields")
            }
        }

    }

    componentDidMount() {
        axios.get('/api/team/getTeams')
        .then(res => {
            console.log(res.data);
            this.setState({
                Teams: res.data
            })
        })
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
            <InputLabel id="selectLabel">Team</InputLabel>
                <Select
                className="selects"
                name="team"
                labelId="selectLabel"
                id="select"
                value={this.state.Team}
                onChange={(e) => {
                    this.setState({Team: e.target.value})
                }}
                >
                {this.state.Teams.map(t => {
                    return (
                        <MenuItem key={t.id} value={t.id}>{t.id} {t.Name}</MenuItem>
                    )
                })}
                </Select>
                <br></br><br></br>
                <Button variant="contained" size="medium" color="primary"  onClick={this.onCreate}>
                Create
            </Button>
            </Grid>
            <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )
    }
}

export default withRouter(CreateProject)
