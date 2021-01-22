
import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
import PageHeader from './DashboardComponents/PageHeader'
import { Table, CssBaseline, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
// import {router} from '../../../routes';
// import {get} from '../../../controllers/user'

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
      rows: []
    }

    this.changeUsername = (e) => {
      axios.post('/api/user/updateUserName/:id', {})
    }
     // va fi implementat, ma gan
    this.changePasswd = (e) => {
      axios.post('/api/user/updatePassword', {})
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
    axios.get('/api/user/getUser')
      .then(res => {
        console.log(res.data);
        let rows = [];
        for (let info in res.data) {
          if (info != 'id' && info != 'Password')
            rows.push(createData(info, res.data[info]));
        }
        this.setState({
          rows
        })
      })
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
                <TableRow >
                  <TableCell>INFO</TableCell>
                  <TableCell align="left">USER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row) => (
                  <TableRow align="left" key={row.info} hover="true">
                    <TableCell component="th" scope="row">{row.info}</TableCell>
                    <TableCell >{row.infouser}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br><br></br>
          <Button variant="contained" onClick={this.changeUsername}>Reseteaza parola</Button>
          <Button variant="contained" onClick={this.changePasswd}>Schimba Nume</Button>
        </div>
        <CssBaseline />

      </>
    )
  };
}

export default withRouter(Dashboard);
