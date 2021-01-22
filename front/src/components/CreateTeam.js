import React, { Component } from 'react';
import axios from 'axios'
import { TextField, Button, Grid, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom';
class CreateTeam extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            openSuccess: false,
            openError: false
        }

        this.changeHandler = (e) => {
            this.setState({

                name: e.target.value
            })

        }

        this.onCreateTeam = (e) => {
            let token = localStorage.getItem('token');
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
            if (this.state.name) {
                axios.post('/api/team/createTeam', { name: this.state.name })
                    .then((res) => {
                        console.log(res.data);
                        this.setState({ openSuccess: true })
                        props.history.push("/dashboard")
                    })
                    .catch(error => {
                        console.log(error.response.data);
                        toast.error(`${error.response.data.message}`);
                    }) //cu toastify
            } else {
                this.setState({ openError: true })
            }
        }

        this.handleCloseSuccess = () => {
            this.setState({ openSuccess: false })
        }
        this.handleCloseError = () => {
            this.setState({ openError: false })
        }

    }
    render() {
        return (
            <div>

                <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
                    <h1>CreateTeam</h1>
                    <Grid item xs={12} sm={6}>
                        <TextField name="name" onChange={this.changeHandler} value={this.state.name} id="outlined-basic" autoFocus required label="Team Name" variant="outlined" />
                    </Grid>

                    <Button variant="contained" size="medium" color="primary" onClick={this.onCreateTeam}>
                        send
            </Button>
                </Grid>
                <Snackbar open={this.state.openSuccess} autoHideDuration={2000} onClose={this.handleCloseSuccess}>
                    <Alert severity="success" onClose={this.handleCloseSuccess}>
                        You have successfully create a team!
            </Alert>
                </Snackbar>
                <Snackbar open={this.state.openError} autoHideDuration={2000} onClose={this.handleCloseError}>
                    <Alert severity="error" onClose={this.handleCloseError}>
                        Check your fields again so they're not empty
            </Alert>
                </Snackbar>
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

export default withRouter(CreateTeam);