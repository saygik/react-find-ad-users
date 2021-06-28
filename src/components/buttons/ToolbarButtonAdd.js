import * as React from 'react';
import { useCallback } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Button from './ToolbarButton';

const AddButton = ({
                       label = 'ssp.action.add',
                       onClick,
                       icon = defaultIcon,
}) => {
    const handleClick = useCallback(
        e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        },
        [onClick]
    );
return (
    <Button label={label} onClick={handleClick}>
        {icon}
    </Button>
)}

const defaultIcon = <AddIcon />;
export default AddButton;
