import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
import PageHeader from './DashboardComponents/PageHeader'
import {withRouter} from 'react-router-dom'
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import '../css/viewProjects.css'
import {Button} from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {TextField, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle} from '@material-ui/core'
import {InputLabel, MenuItem, Select} from '@material-ui/core'

const styles = {
    appMain: {
      paddingLeft: '250px',
      width: '100%'
    },
    background: {
      default: "#f4f5fd"
    },
  
    table: {
      width: '50%'
    },
    TableContainer: {
      width: '100%',
      align: 'center'
    },
    h1: {
        align: 'center'
    },

  }

class ViewTeams extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Teams: [],
            teamID: -1,
            dialog: false,
            Users: [],
            User: ''
        }

        this.openDialog = () => {
            this.setState({dialog: true})
        }
        this.closeDialog = () => {
            this.setState({dialog: false})
        }

        this.getTeams = () => {
            axios.get('/api/team/getTeams')
            .then(res => {
                console.log(res.data);
                this.setState({
                    Teams: res.data
                });
            })
        }

    }


    componentDidMount() {
        this.getTeams();

        axios.get('/api/user/getUsers') 
        .then(res => {
            console.log(res.data);
            this.setState({
                Users: res.data
            });
        })
    }

    render() {
        return (
            <div>
                <SideMenu name="home"></SideMenu>
                <div className="App" style={styles.appMain}>
                <Header></Header>
                <h1>View All Teams</h1>
                <TableContainer className="projectsTable"component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Members</TableCell>
                                <TableCell align="center">Add member</TableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.Teams.map((t, index) => {
                                    return <TableRow key={index}>
                                        <TableCell align="center" component="th" scope="row">
                                        {t.id}
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">
                                        {t.Name}
                                        </TableCell>
                                        <TableCell align="center">{t.Users.map((u) => {
                                            return `${u.FirstName} ${u.LastName}, `
                                        })}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={
                                                () => {
                                                    this.setState({teamID: t.id});
                                                    this.openDialog();
                                                }
                                            }>
                                                Add member
                                            </Button>
                                        </TableCell>
                                        

                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

        <Dialog open={this.state.dialog} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add link for the commit where you solved the bug:
          </DialogContentText>
          <InputLabel id="selectLabel">Users</InputLabel>
                <Select
                className="selects"
                name="priority"
                labelId="selectLabel"
                id="select"
                value={this.state.User}
                onChange={(e) => {
                    this.setState({User: e.target.value})
                }}
                >
                {this.state.Users.map(u => {
                    return (
                        <MenuItem key={u.id} value={u.id}>{u.LastName} {u.FirstName}</MenuItem>
                    )
                })}
                </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={
              () => {
                  axios.put("/api/team/addUserTeam", {
                      teamID: this.state.teamID,
                      userID: this.state.User
                  })
                  .then(res => {
                    this.closeDialog(); 
                    toast.success(res.data);
                    this.getTeams();
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
                </div>
            </div>
        )
    }
}
export default withRouter(ViewTeams);

