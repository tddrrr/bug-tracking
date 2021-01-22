
import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
import PageHeader from './DashboardComponents/PageHeader'
import { Table, CssBaseline, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
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

const rows = [
  createData('FirstName', "Ana"),
  createData('LastName', 27),
  createData('Email', "Fete"),
  createData('Password', 3)
];


//   async componentDidMount() {
//     let data = await get(router);
//     if (data.hasErrors){
//         alert(data.message);
//         return;
//     }

//     this.setState({rows: data});
// }
class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titlu: props.titlu,
      subtitlu: props.subtitlu
    }
  }




  render() {
    return (
      <>
        <SideMenu name="home"></SideMenu>
        <div className="App" style={styles.appMain}>
          <Header></Header>
          <PageHeader title={this.state.titlu} subtitle={this.state.subtitlu}></PageHeader>
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
                {rows.map((row) => (
                  <TableRow align="left" key={row.info} hover="true">
                    <TableCell component="th" scope="row">{row.info}</TableCell>
                    <TableCell >{row.infouser}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <CssBaseline />
      </>
    )
  };
}

export default Dashboard;
