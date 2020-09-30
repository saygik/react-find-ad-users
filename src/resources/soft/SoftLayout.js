import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NotFound from '../../components/layout/BeginToFind'
import SoftCards from "../../components/SoftCards"

const useStyles = makeStyles(theme => ({
    searchResult: {
        marginRight: theme.spacing(2),
    },
    cardsGrid: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(8),
        },
    },

}));


const SoftLayout=(props)=>{
    const classes = useStyles();
    const {searchValues, filtredValues, searching } = props

    return (
        <>
            <Grid container justify="center" className={classes.cardsGrid} mb={2}>
                <Grid  item  xs={12} >
                    {filtredValues.length === 0
                        ? <NotFound loading={searching} filtred={searchValues[0].length > 1}/>
                        : <SoftCards
                            software={filtredValues}
                            searchValues={searchValues}
                        />
                    }
                </Grid>
            </Grid>

        </>
    );
}

export default SoftLayout
