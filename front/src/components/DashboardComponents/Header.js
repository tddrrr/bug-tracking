import { AppBar, Grid, IconButton, Toolbar, Badge, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import BugReportIcon from '@material-ui/icons/BugReport';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
                            <IconButton>
                                <Badge >
                                    <BugReportIcon color="C33C54"/>
                                    {/* aici vom arata cate buguri sunt deschise sau ceva de genul */}
                                </Badge>
                            </IconButton>
                            <IconButton>
                                <Badge  >
                                    <PowerSettingsNewIcon />
                                    {/* aici vom arata cate buguri sunt deschise sau ceva de genul */}
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>
        );
    }
}

export default header;