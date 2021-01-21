import { Card, Paper, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import React from 'react';

// const styles = {
//     textStyle: {
//         padding: '10px',
//         display: 'flex',
//         marginBottom: '5px'
//     }

// }

const PageHeader = (props) => (
    <Paper elevation={0} square>
        <div >
            <Typography variant="h6" component="div">
                {props.title}
            </Typography>
            <Typography variant="hsubtitle6" component="div">
                {props.subtitle}
            </Typography>

        </div>

    </Paper>
)
export default PageHeader;