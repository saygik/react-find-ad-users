import * as React from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar"


const useStyles = makeStyles(
    theme => ({
        root: {
            color:'#6a6a6a',
            paddingTop:'10px',
            paddingBottom:'10px',
            fontSize:'28px',
            fontWeight:'600',
            // borderBottom: '2px solid #ccc',
            backgroundColor: theme.palette.primary.main
        },
        icon: {
            color: theme.palette.secondary.main,
            marginRight:'20px',
            fontSize:'40px',
        },
        toolbar: {
            color: theme.palette.secondary.main,
            margin: '10px',
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
        icon
      } = props;
    const ListIcon=icon
    const classes = useStyles(props);
    return (
        <Box className={classes.root} display="flex">
        <Toolbar className={classes.toolbar}>
            {icon && <ListIcon color="secondary"  className={classes.icon}/>}
            <Box letterSpacing={3} >
                {title}
            </Box>
            <span />
        </Toolbar>
        </Box>
    );
};


export default ListTitle;
