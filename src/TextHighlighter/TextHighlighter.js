import React from 'react'
import Highlighter from "react-highlight-words"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    colorize:{
        backgroundColor:'#fafdca',
        color:'red'
    },

}));
const TextHighlighter = ({text,searchValue, highlight}) => {
    const classes = useStyles();
    if (!highlight) return <>{text}</>
    const searchWords=searchValue
    //searchValue && searchWords.push(searchValue)
    return <Highlighter
        highlightClassName={classes.colorize}
        caseSensitive={false}
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={text}
    />
}
export default TextHighlighter
