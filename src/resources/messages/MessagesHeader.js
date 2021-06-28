import React from "react"
import {Box, Divider } from "@material-ui/core"
import {ListToolbar, TopToolbar, ListHeaderRounded} from "../../components/layout"
import {AddButton, TemplateButton} from "../../components/buttons"
import AddIcon from "@material-ui/icons/Add"
import {makeStyles} from "@material-ui/core/styles"
import {Checkbox} from '../../components/@inputs'
import {useData} from "../../context/Data"
import {DeleteButton} from '../../components/buttons'

const TemplateActions = ({ className }) => {
    const {  actions:{newMessageDialogOpen} } = useData()
    return(
        <TopToolbar>
            <AddButton label={"НОВОЕ СООБЩЕНИЕ"}
                       icon={<AddIcon />}
                       onClick={()=> newMessageDialogOpen()}/>
        </TopToolbar>
    )
}
const TemplateFilters = ({ className }) => {
    const {
        actions:{selectAllResponseMessages},
        selectors: {isHasSelectedMessages, selectedResponseMessages},
        mutations: { responceMessages : {deleteSelected }}
    } = useData()
    const [checked, setChecked] = React.useState(false);
    const classes = useStyles();
    const handleChange = (event) => {
        setChecked(event.target.checked);
        selectAllResponseMessages(event.target.checked)
    };
    return(
        <TopToolbar>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Divider orientation="vertical" flexItem className={classes.divider} />
            {isHasSelectedMessages && <DeleteButton
                label={"Удалить"}
                size={"large"}
                onClick={() => {
                    deleteSelected(selectedResponseMessages)
                }}
            />
            }
        </TopToolbar>
    )
}
const MessagesHeader = () => {
    return (
        <ListHeaderRounded>
            <ListToolbar
                filters={<TemplateFilters/>}
                actions={<TemplateActions/>}
            />
        </ListHeaderRounded>
    )
}
export default MessagesHeader

const useStyles = makeStyles(theme => ({
    templateButton:{
        '& .MuiSvgIcon-root':{
            fontSize:'32px',
        }
    },
    divider: {
        marginLeft: 15,
        marginRight: 20,
        marginBottom: 7,
    }
}));
