import React from 'react'
import _ from "lodash"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import UserCard from './Card'


const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const UserProps = (props) => {
    // const classes = useStyles();
    const { onClose, selectedValue } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="simple-dialog-title"
                open={!_.isEmpty(selectedValue)}>

            <DialogContent dividers>
                <UserCard user={selectedValue} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>

        </Dialog>
    );
}




export default UserProps


