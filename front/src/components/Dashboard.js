
import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
import PageHeader from './DashboardComponents/PageHeader'
import { Table, CssBaseline, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify';
import {TextField, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle} from '@material-ui/core'

const styles = {
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  },
  background: {
    default: "#f4f5fd"
  },

  table: {
    width: '100%'
  },
  TableContainer: {
    width: '50%',
    allign: 'center'
  }
}
function createData(info, infouser) {
  return { info, infouser };
}

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: [],
      dialog: false,
      secondDialog: false,
      User: '',
      firstName: '',
      lastName: '', 
      password: ''
    }

    this.openDialog = () => {
      this.setState({dialog: true})
    }
    this.closeDialog = () => {
        this.setState({dialog: false})
    }
    this.openSecondDialog = () => {
      this.setState({secondDialog: true})
    }
    this.closeSecondDialog = () => {
        this.setState({secondDialog: false})
    }

    this.getUser = () => {
      axios.get('/api/user/getUser')
      .then(res => {
        console.log(res.data);
        this.setState({
          User: res.data
        })
      })
    }
  }

  async componentDidMount() {
    this.getUser();
  }


  render() {
    return (
      <>
        <SideMenu name="home"></SideMenu>
        <div className="App" style={styles.appMain}>
          <Header></Header>
          <PageHeader title={""} subtitle={""}></PageHeader>
          <br></br><br></br><br></br>
          <TableContainer style={{ width: 400, margin: 'auto' }} component={Paper}>
            <Table style={styles.table} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell>INFO</TableCell>
                  <TableCell align="left">USER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    FirstName
                  </TableCell>
                  <TableCell align="left">
                    {this.state.User.FirstName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    LastName
                  </TableCell>
                  <TableCell align="left">
                    {this.state.User.LastName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Email
                  </TableCell>
                  <TableCell align="left">
                    {this.state.User.Email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Password
                  </TableCell>
                  <TableCell align="left">
                    {this.state.User.Password}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br></br><br></br>
          <Button variant="contained" onClick={() => {
            this.openDialog();
          }}>Schimba nume</Button>
          <Button variant="contained" onClick={() => {
            this.openSecondDialog();
          }}>Schimba Parola</Button>
        </div>
        <CssBaseline />


        <Dialog open={this.state.dialog} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change your name
          </DialogContentText>
          <TextField value={this.state.firstName} onChange={(e) => {
              this.setState({firstName: e.target.value})}}
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField value={this.state.lastName} onChange={(e) => {
              this.setState({lastName: e.target.value})}}
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={
              () => {
                  axios.put("/api/user/updateUserName", {
                      firstName: this.state.firstName,
                      lastName: this.state.lastName
                  })
                  .then(res => {
                    this.closeDialog(); 
                    toast.success(res.data);
                    this.getUser();
                })
                  .catch(err => {
                      this.closeDialog();
                      toast.error(err.response.data)
                  })
              }
          } color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={this.state.secondDialog} onClose={this.closeSecondDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change your password
          </DialogContentText>
          <TextField value={this.state.password} onChange={(e) => {
              this.setState({password: e.target.value})}}
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeSecondDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={
              () => {
                  axios.put("/api/user/updatePassword", {
                      password: this.state.password,
                  })
                  .then(res => {
                    this.closeSecondDialog(); 
                    toast.success(res.data);
                    this.getUser();
                })
                  .catch(err => {
                      this.closeSecondDialog();
                      toast.error(err.response.data)
                  })
              }
          } color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      </>
    )
  };
}

export default withRouter(Dashboard);
