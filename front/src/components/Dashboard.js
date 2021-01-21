
import React, { Component } from 'react'
import SideMenu from './DashboardComponents/SideMenu/SideMenu';
import Header from './DashboardComponents/Header'
import PageHeader from './DashboardComponents/PageHeader'
import { CssBaseline } from '@material-ui/core';

const styles = {
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  },
  background: {
    default: "#f4f5fd"
  }

}
const titleConst = "Titlu din props, in functie de ce apelam"
class Dashboard extends Component {
  render() {
    return (
      <>
        {/* <> e shortcut pentru react fragment, ca sa "creem" o componenta parinte */}
        <SideMenu
        name="home"></SideMenu>
        <div className="App" style={styles.appMain}>
          <Header></Header>
          <PageHeader title={titleConst} subtitle="Subtitlu ca mai sus"> titlu</PageHeader>
        </div>
        <CssBaseline />
      </>
    )
  };
}

export default Dashboard;
