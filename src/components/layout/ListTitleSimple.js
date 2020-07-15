import * as React from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    theme => ({
        root: {
            color:'#6a6a6a',
            paddingBottom:'5px',
            fontSize:'20px',
            fontWeight:'400',
            // borderBottom: '2px solid #ccc'
        },

    }),
    { name: 'ListTitle' }
);

const ListTitleSimple = props => {
    const {
        title
    } = props;
    const classes = useStyles(props);
    return (
        <Box letterSpacing={3} className={classes.root}>
            {title}
        </Box>
    );
};



export default ListTitleSimple;
