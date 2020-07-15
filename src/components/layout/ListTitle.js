import * as React from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar"

const useStyles = makeStyles(
    theme => ({
        root: {
            color:'#6a6a6a',
            marginTop:'20px',
            marginBottom:'15px',
             paddingBottom:'5px',
            fontSize:'22px',
            fontWeight:'600',
            borderBottom: '2px solid #ccc'
        },
        count: {
            color:'#4863ba',
            fontSize:'20px',
            fontWeight:'600',
        },
        toolbar: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingRight: 0,
            minHeight:0,
            [theme.breakpoints.up('xs')]: {
                paddingLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
                backgroundColor: theme.palette.background.paper,
            },
        },
    }),
    { name: 'ListTitle' }
);

const ListTitle = props => {
    const {
        title,
        count
      } = props;
    const classes = useStyles(props);
    return (
        <Box className={classes.root}>
        <Toolbar className={classes.toolbar}>
            <Box letterSpacing={3} >
                {title}
            </Box>
            <span />
            {count &&
            <Box letterSpacing={1}  className={classes.count}>
                {count}
            </Box>
            }
        </Toolbar>
        </Box>
    );
};


export default ListTitle;
