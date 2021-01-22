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

class ViewBugs extends Component {
    constructor(props) {
        super(props)

        this.id = this.props.match.params.id
        console.log(this.id)

        this.state = {
            Bugs: [],
            dialog: false,
            bugID: -1,
            linkSolved: ''
        }

        this.openDialog = () => {
            this.setState({dialog: true})
        }
        this.closeDialog = () => {
            this.setState({dialog: false})
        }
        this.getBugs = () => {
            axios.get(`/api/bug/getAllBugs/${this.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    Bugs: res.data
                });
            }) 
        }
    }

    componentDidMount() {
        this.getBugs();
    }

    render() {
        return (
            <div>
                <SideMenu name="home"></SideMenu>
                <div className="App" style={styles.appMain}>
                <Header></Header>
                <h1>View all bugs from project</h1>
                <TableContainer className="projectsTable"component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Severity</TableCell> 
                                <TableCell align="center">Priority</TableCell> 
                                <TableCell align="center">LinkBug</TableCell> 
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">LinkSolved</TableCell>
                                <TableCell align="center">userID</TableCell>
                                <TableCell align="center">Assign</TableCell>
                                <TableCell align="center">Update</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.Bugs.map((b, index) => {
                                    return <TableRow key={index}>
                                        <TableCell align="center" component="th" scope="row">
                                        {b.Description}
                                        </TableCell>
                                        <TableCell align="center">{b.Severity}</TableCell>
                                        <TableCell align="center">{b.Priority}</TableCell>
                                        <TableCell align="center">{b.LinkBug}</TableCell>
                                        <TableCell align="center">{b.Status}</TableCell>
                                        <TableCell align="center">{b.LinkSolved ? b.LinkSolved: "-"}</TableCell>
                                        <TableCell align="center">{b.userID ? b.userID: "-"}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={
                                                () => {
                                                    axios.put("/api/bug/assignBug", {id: b.id})
                                                    .then(res => {
                                                        toast.success(res.data)
                                                        this.getBugs();
                                                    })
                                                    .catch(err => {
                                                        toast.error(err.response.data)
                                                    })
                                                }
                                            }>
                                                assign
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={
                                                () => {
                                                    this.setState({bugID: b.id});
                                                    this.openDialog();
                                                }
                                            }>Update
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
          <TextField value={this.state.linkSolved} onChange={(e) => {
              this.setState({linkSolved: e.target.value})}}
            autoFocus
            margin="dense"
            id="name"
            label="Link Solved"
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
                  axios.put("/api/bug/updateBug", {
                      id: this.state.bugID, 
                      status: "solved",
                      linkSolved: this.state.linkSolved
                  })
                  .then(res => {
                    this.closeDialog(); 
                    toast.success(res.data)
                    this.getBugs();
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
            </div>
        )
    }
}
export default withRouter(ViewBugs);

