import React, {Component} from 'react'
import '../css/register.css'
import axios from 'axios'
import {TextField, Button, Grid, Icon} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component{
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.changeHandler=(e) => {
            this.setState({
                [e.target.name]: e.target.value
            }) 
        }

        this.onLogin = (e) => {
            if (this.state.email && this.state.password) {
                axios.post('/api/auth/login', {email: this.state.email, password: this.state.password})
                    .then((res) => {console.log(res.data);
                        console.log(res.data);
                        toast.success("Logged in successfully")
                        localStorage.setItem('token', res.data.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer `+ res.data.token // for all requests
                    })
                    .catch(error => {console.log(error.response.data);
                                    toast.error(`${error.response.data.message}`);}) //cu toastify
        } else {
            toast.error("You have to complete the fields")
        }
    }
}


    render() {
        return(
            <div>
            <h1 className="loginTitle">Login</h1>
            <Grid container direction="column" justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField name="email" onChange={this.changeHandler} value={this.state.email} id="outlined-basic" autoFocus required label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField name="password" onChange={this.changeHandler} value={this.state.password} id="outlined-basic" autoFocus required label="Password" variant="outlined" />
            </Grid>
            <Button variant="contained" size="medium" color="primary" endIcon={<Icon>send</Icon>} onClick={this.onLogin}>
                login
            </Button>
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
            </Grid>
            </div>
        )
    }
}