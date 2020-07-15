import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import RadioButtonGroupInput from "../input/RadioButtonGroupInput"
import {trueFalseChoices} from "../../services/userFiltersChoices"
import {makeStyles} from "@material-ui/core/styles"
import {IconButton, Tooltip} from "@material-ui/core"
import classNames from "classnames"
import FilterListIcon from '@material-ui/icons/FilterList';
import lodashGet from "lodash/get"

export const SIDEBAR_WIDTH = 340;
export const CLOSED_SIDEBAR_WIDTH = 0;
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        overflowX: 'hidden',
        marginRight: '2em',
        marginTop: '20px',
        padding: props =>props.open ? theme.spacing(2): 0,
        backgroundColor: '#fefefe',
        width: props =>
            props.open
                ? lodashGet(theme, 'sidebar.width', SIDEBAR_WIDTH)
                : lodashGet(
                theme,
                'sidebar.closedWidth',
                CLOSED_SIDEBAR_WIDTH
                ),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    rootButton:{
        order: '-1',
    },
    menuButton: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
}));

const FiltersSidebar = (props) => {
    const [open,setSidebar]=useState(false)
    const {filters, onChange}=props
    const classes = useStyles({ ...props, open });
    return (
         <div className={classNames(classes.rootButton)}>
            <Tooltip
                title={
                    open
                        ? 'Закрыть фильтры'
                        : 'Открыть фильтры'
                }
                enterDelay={500}
            >
                <IconButton
                    color="inherit"
                    onClick={() => setSidebar(!open)}
                    className={classNames(classes.menuButton)}
                >
                    <FilterListIcon
                        classes={{
                            root: open
                                ? classes.menuButtonIconOpen
                                : classes.menuButtonIconClosed,
                        }}
                    />
                </IconButton>
            </Tooltip>
             <Paper elevation={3} className={classes.root}>
                 {Object.keys(filters).map(filter => (
                     <RadioButtonGroupInput
                         key={filter}
                         source={filter}
                         label={filters[filter].name}
                         value={filters[filter].value}
                         onChange={onChange}
                         choices={trueFalseChoices}/>
                 ))
                 }
             </Paper>
         </div>
    )
}
export default FiltersSidebar
