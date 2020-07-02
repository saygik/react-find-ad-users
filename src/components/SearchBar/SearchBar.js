import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box"
import UserCards from '../UserCards'
import SoftCards from '../SoftCards'
import NotFound from '../layout/BeginToFind'
import UserPropsDialog from '../UserProps'
import {useData} from '../../context/Data'

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


const SearchBar=()=>{
    const classes = useStyles();
    const {selectors, actions } = useData()
    const {searchValues, adFiltredUsers, filtredSoft, searching, selectedUser, isCurrentListUsers, currentListCount
    } = selectors
    const {selectUserByNameOrMail, setSelectedUser
    } = actions

    const handleDialogClose = () => selectUserByNameOrMail()

    const findAndSelectUser = (user) => selectUserByNameOrMail(user)

    return (
        <Box mb={4}>

            <Grid container justify="center" className={classes.cardsGrid} mb={2}>
                <Grid  item  xs={12} sm={12} md={12}>
                            {currentListCount === 0
                                ? <NotFound loading={searching} filtred={searchValues[0].length > 1}/>
                                : isCurrentListUsers
                                    ? <UserCards
                                        adFiltredUsers={adFiltredUsers}
                                        setSelectedUser={setSelectedUser}
                                        searchValues={searchValues}
                                      />
                                    : <SoftCards
                                        software={filtredSoft}
                                        searchValues={searchValues}
                                        findAndSelectUser={findAndSelectUser}
                                      />
                            }
                </Grid>
            </Grid>

            <UserPropsDialog selectedValue={selectedUser} onClose={handleDialogClose} />
        </Box>
    );
}

export default SearchBar
