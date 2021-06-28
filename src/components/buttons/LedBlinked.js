import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import AdjustIcon from '@material-ui/icons/Adjust';
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles({
    root:{
        fontSize:'24px',
        marginRight:'10px'
    },
    '@keyframes flicker': {
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0.5,
        },
    },
    flicker: {
        animationName: '$flicker',
        animationDuration: '300ms',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in-out',
    },
    withAnimation: ({ disabled }) => ({
        animationPlayState: disabled ? 'paused' : 'running',
        color: disabled ? '#2efc2e' : '#ff9292',
    }),
});

const LedBlinked = ({ disabled }) => {
   // const {label, icon, className, onClick, ...rest} = props
    const {root, flicker, withAnimation  } = useStyles({ disabled })
    const buttonLabel="соединение с SSP"
    return (
        <Tooltip title={buttonLabel}>
                <AdjustIcon className={`${root} ${flicker} ${withAnimation}`}/>
        </Tooltip>
    );
}
export default LedBlinked
