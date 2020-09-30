import * as React from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Link from "@material-ui/core/Link"
import TextHighlighter from "../TextHighlighter"

const useStyles = makeStyles(
    theme => ({
        root: {
            color:'#81817f',
            fontSize:'1.3rem',
            fontWeight: 500,
            textAlign:'left',
        },
        link : {
            cursor:'pointer',
            "&:hover": {
                color: 'rgba(26,28,254,0.87)',
                textDecoration: 'underline'
            }
        }
    }),
    { name: 'ListItemText' }
);

const TextHighlight= props => {
    const {
        text,
        highlightText,
    } = props;
    return(
        highlightText ? <TextHighlighter searchValue={highlightText} text={text}  />: text
    )
}

const ListItemText = props => {
    const {
        className,
        text,
        onClick,
        highlightText,
    } = props;
    const classes = useStyles(props);
    if (!text) return null
    return (
        <Box letterSpacing={3}
             className={classnames(classes.root, className)}
        >
            {onClick
                    ? <Box onClick={onClick} color="inherit" className={classnames(classes.link, className)}>
                            <TextHighlight text={text} highlightText={highlightText}/>
                      </Box>
                    : <TextHighlight text={text} highlightText={highlightText}/>
            }
        </Box>
    );
};

ListItemText.defaultProps = {
    highlightText: '',
};

export default ListItemText;
