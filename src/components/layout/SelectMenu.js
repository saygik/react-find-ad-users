import * as React from 'react';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import {MenuItem, withStyles} from '@material-ui/core'
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box"
import {useData} from "../../context/Data"

const defaultLabel = 'Тип поиска'

const StyledButton = withStyles({
    root: {
        color: "#fff",
        marginRight: "30px"
    },
})(Button);


const SelectMenu = props => {

    const {selectors, actions } = useData()
    const { searchTypeLabel }=selectors
    const [anchorEl, setAnchorEl] = useState(null);

    const { label } = props;
    const open = Boolean(anchorEl);
    const menuLabel=label || defaultLabel

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);

    const handlePeoples = () => {
        setAnchorEl(null);
        actions.setSerachType('peoples')
    }
    const handleSoft = () => {
        setAnchorEl(null);
        actions.setSerachType('soft')
    }
    return (
        <div>
            <Tooltip title={menuLabel}>
                <StyledButton
                    ref={anchorEl}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    endIcon={<ExpandMoreIcon />}
                >
                    <Box letterSpacing={2} >
                        {searchTypeLabel}
                    </Box>
                </StyledButton>
            </Tooltip>
            <Menu
                id="menu-appbar-select"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handlePeoples}>Люди</MenuItem>
                <MenuItem onClick={handleSoft}>Сервисы ИВЦ</MenuItem>
            </Menu>
        </div>
    );
};


export default SelectMenu;
