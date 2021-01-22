
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
// function changeProps(t, st){
//   this.state.titlu=t;
//   this.state.subtitlu=st;
// }
// const titleConst = "Titlu din props, in functie de ce apelam"
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
        </div>
        <CssBaseline />
      </>
    )
  };
}

export default Dashboard;
