import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import {useSnackbar} from "notistack"
import {  withStyles} from "@material-ui/core/styles"
import LinearProgress from '@material-ui/core/LinearProgress';
import {useData} from "../context/Data"
import {useAuth} from '../context/Auth'
import FilterBar from './FilterBar'
import Toolbar from './ToolBar'

const FilterProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#00695c',
    },
})(LinearProgress);



function MenuAppBarContainer() {

    const {signedIn, actions, user}= useAuth()
    const {selectors, actions: dataActions  } = useData()
    const { loading } = selectors
    const { enqueueSnackbar } = useSnackbar()

    const [expanded, setExpanded] = React.useState(false)

    return <React.Fragment>
        <AppBar position="fixed" >
            <Toolbar
                searchTypeLabel={selectors.searchTypeLabel}
                signedIn={signedIn}
                actions={actions}
                dataActions={dataActions}
                enqueueSnackbar={enqueueSnackbar}
                user={user}
                // adFiltredUsers={adFiltredUsers}
                // filtredSoft={filtredSoft}
                // isCurrentListUsers={isCurrentListUsers}
            />
            <FilterBar expanded={expanded} setExpanded={setExpanded}/>
        </AppBar>
        <FilterProgress value={0} variant={loading ? 'indeterminate' : 'determinate'}
                        style={{marginTop: expanded ? '258px':'130px', height: 3}}/>
    </React.Fragment>
}


export default MenuAppBarContainer


