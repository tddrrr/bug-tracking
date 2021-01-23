import { AppBar, Grid, IconButton, Toolbar, Badge, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const styles ={
    navbar:{
        backgroundColor:"#37718E"
    }
}

class header extends Component {
    render() {
        return (
            <AppBar position="static" style={styles.navbar} >
                <Toolbar>
                    <Grid container>
                        <Grid item >
                            <div>
                                <Typography variant="h6" component="div">
                                    BUG TRACKING APP
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item sm></Grid>
                        <Grid item >
                            <IconButton onClick={
                                () => {localStorage.clear()
                                    axios.defaults.headers.common['Authorization'] = ''
                                    this.props.history.push("/")
                                    }
                            }>
                                <Badge  >
                                    <PowerSettingsNewIcon />
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>
        );
    }
}

export default withRouter(header);