import { Card, Paper, Typography,Container  } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import React from 'react';

const styles = {
    textStyle: {
        padding: '10px',
        display: 'flex',
        marginBottom: '5px'
    },
    container:{
       // backgroundColor: "blue"
    }
    

}

const PageHeader = (props) => (
    <Paper elevation={0} square>
        <Card  style={styles.container} >
            <Typography variant="h6" component="div">
                {props.title}
            </Typography>
            <Typography variant="hsubtitle6" component="div">
                {props.subtitle}
            </Typography>
            <Container fixed >
                <h1> 
                    PROFIL UTILIZATOR
                </h1>

            </Container>
        </Card >

    </Paper>
)
export default PageHeader;