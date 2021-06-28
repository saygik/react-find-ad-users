import React, {useCallback} from 'react'
import Button from "./Button"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const defaultIcon = <DeleteForeverIcon />;
const ButtonDelete = ({
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

export default ButtonDelete
