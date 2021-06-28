import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Grid, Box, Hidden, useMediaQuery} from "@material-ui/core"
import CategorySelector from "./CategorySelector"
import SearchInput from "./SearchInput"
import {ListHeaderRounded, ListToolbar, TopToolbar} from "../../components/layout"
import {useData} from "../../context/Data"
import {AddButton} from "../../components/buttons"
import AddIcon from "@material-ui/icons/Add"



const useStyles = makeStyles(theme => ({
    root: {
        width:'100%'
}}
));

const TemplateActions = () => {
    const {actions:{ templateDialogOpen}}= useData()
    return(
        <TopToolbar>
            <AddButton label={"НОВЫЙ ШАБЛОН"}
                       icon={<AddIcon />}
                       onClick={()=>templateDialogOpen()}/>
        </TopToolbar>
    )
}
const MessageTemplatesHeader = () => {
    const classes = useStyles();
    return (
        <>
        <ListHeaderRounded>
            <ListToolbar
                actions={<TemplateActions/>}
            />
        </ListHeaderRounded>
        <Grid container className={classes.root} >
            <Grid item lg={6}>
                    <Box display="flex" flexDirection="row" >
                        <SearchInput/>
                    </Box>
            </Grid>
            <Grid item lg={6} >
                <Box display="flex" flexDirection="row-reverse" >
                    <CategorySelector/>
                </Box>
            </Grid>
        </Grid>
        </>
    )
}
export default MessageTemplatesHeader




