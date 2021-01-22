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
            Projects: []
        }
    }

    componentDidMount() {
        axios.get('/api/project/getProjects')
        .then(res => {
            console.log(res.data);
            this.setState({
                Projects: res.data
            });
        })
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

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.Projects.map((p, index) => {
                                    return <TableRow key="index">
                                        <TableCell align="center" component="th" scope="row">
                                        {p.Name}
                                        </TableCell>
                                        <TableCell align="center">{p.Description}</TableCell>
                                        <TableCell align="center">{p.Repo}</TableCell>
                                        <TableCell align="center">{p.teamID}</TableCell>
                                        <TableCell align="center">
                                            <Button>Click to add</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                        <Button onClick={() => {
                                            this.props.history.push(`/dashboard/project/${p.id}/bugs`)
                                        }}>Click to see</Button>

                                        </TableCell>

                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                </div>
            </div>
        )
    }
}
export default withRouter(ViewProjects);

