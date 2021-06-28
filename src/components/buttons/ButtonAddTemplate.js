import React, {useCallback} from 'react'
import Button from "./Button"
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';

const defaultIcon = <AddToPhotosOutlinedIcon />;
const ButtonAddTemplate = ({
                          label = 'ssp.button.delete',
                          icon = defaultIcon,
                          onClick,
                          size,
                          color,
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
        <Button label={label} onClick={handleClick} size={size} color={color}>
            {icon}
        </Button>
    )}

export default ButtonAddTemplate
