import React, {Component} from 'react'
import '../css/register.css'
import axios from 'axios'
import {TextField, Button, Icon, Grid, Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom'

class Register extends Component{
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            openSuccess: false,
            openError: false
        }

        this.changeHandler=(e) => {
            this.setState({
                [e.target.name]: e.target.value
            }) 
        }

        this.onRegister = (e) => {
            if (this.state.firstName && this.state.lastName && this.state.password && this.state.email && this.state.password) {
                axios.post('/api/auth/register', {firstName: this.state.firstName, lastName: this.state.lastName, 
                    email: this.state.email, password: this.state.password})
                    .then((res) => {console.log(res.data);
                        this.setState({openSuccess: true})
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
            <h1 className="registerTitle">Register</h1>
            <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField name="firstName" onChange={this.changeHandler} value={this.state.firstName} id="outlined-basic" autoFocus required label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField name="lastName" onChange={this.changeHandler} value={this.state.lastName} id="outlined-basic" autoFocus required label="Last Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
            <TextField name="email" onChange={this.changeHandler} value={this.state.email} id="outlined-basic" autoFocus required label="Email Address" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
            <TextField name="password" onChange={this.changeHandler} value={this.state.password} id="outlined-basic" autoFocus required label="Password" variant="outlined" />
            </Grid>
            <Button variant="contained" size="medium" color="primary" endIcon={<Icon>send</Icon>} onClick={this.onRegister}>
                send
            </Button>
            <p><span onClick={() => {
                this.props.history.push("/");
            }}>Go back to<a> Login.</a></span></p>
            </Grid>
            <Snackbar open={this.state.openSuccess} autoHideDuration={2000} onClose={this.handleCloseSuccess}>
            <Alert severity="success" onClose={this.handleCloseSuccess}>
            You have successfully registered!
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

export default withRouter(Register)
