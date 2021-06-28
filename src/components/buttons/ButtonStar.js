import React, {useCallback} from 'react'
import Button from "./Button"
import StarIcon from '@material-ui/icons/Star';

const defaultIcon = <StarIcon />;
const ButtonStar = ({
                          label = 'ssp.button.star',
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

export default ButtonStar
