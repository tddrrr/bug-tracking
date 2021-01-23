import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
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
import {ToastContainer, toast } from 'react-toastify';
import {Dialog, DialogActions, DialogContent,
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

class ViewProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Projects: [],
            dialog: false,
            projectID: -1
        }

        this.openDialog = (id) => {
            this.setState({dialog: true})
            this.setState({projectID: id})
        }
        this.closeDialog = () => {
            this.setState({dialog: false})
        }
        this.getProjects = () => {
            axios.get('/api/project/getProjects')
            .then(res => {
                console.log(res.data);
                this.setState({
                    Projects: res.data
                });
            })
        }
        
    }

    componentDidMount() {
        this.getProjects();
    }

    render() {
        return (
            <div>
                <SideMenu name="home"></SideMenu>
                <div className="App" style={styles.appMain}>
                <Header></Header>
                <h1>View All Projects</h1>
                <TableContainer className="projectsTable"component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Description</TableCell> 
                                <TableCell align="center">Repo</TableCell> 
                                <TableCell align="center">Team number</TableCell> 
                                <TableCell align="center">Add bug</TableCell>
                                <TableCell align="center">See bugs</TableCell>
                                <TableCell align="center">Delete project</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.Projects.map((p, index) => {
                                    return <TableRow key={index}>
                                        <TableCell align="center" component="th" scope="row">
                                        {p.Name}
                                        </TableCell>
                                        <TableCell align="center">{p.Description}</TableCell>
                                        <TableCell align="center">{p.Repo}</TableCell>
                                        <TableCell align="center">{p.teamID}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => {
                                                this.props.history.push(`/dashboard/project/${p.id}/add`)
                                            }}>Click to add</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                        <Button onClick={() => {
                                            this.props.history.push(`/dashboard/project/${p.id}/bugs`)
                                        }}>Click to see</Button>

                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => {
                                                this.openDialog(p.id);
                                            }}
                                            >Delete</Button>
                                        </TableCell>

                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={this.state.dialog}
                    onClose={this.state.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Are you sure you want to delete this project?</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you delete this project, you cannot recover it.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeDialog} color="primary">
                        NO
                    </Button>
                    <Button onClick={
                        () => {
                            console.log(this.state.projectID);
                            axios.delete("/api/project/deleteProject", {
                                data: {
                                    id: this.state.projectID
                                }
                            })
                            .then(res => {
                                this.closeDialog();
                                toast.success(res.data);
                                this.getProjects();
                            })
                            .catch(err => {
                                this.closeDialog();
                                toast.error(err.response.data)
                            })
                        }
                    } color="primary" autoFocus>
                        YES
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
export default withRouter(ViewProjects);

