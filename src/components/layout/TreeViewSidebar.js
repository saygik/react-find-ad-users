import React, {useEffect, useMemo} from 'react'
import {Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles"
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Label from '@material-ui/icons/Label';
import TreeItem from '@material-ui/lab/TreeItem';
import data from '../../services/structureNOD2data'



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width:'60em',
        order: '-1',
        marginRight: '2em',
        padding: theme.spacing(2),
        height: '75vh',

    },
    tree: {
        fontSize: '20px',
        height: '100%',
        overflow: 'auto',
    },
    label:{
        fontWeight: 'inherit',
        fontSize: '20px',
        flexGrow: 1,
        borderBottom: '2px solid #ccc',
        marginBottom:'25px',
        color:'#3f51b5'
    }
}));

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.primary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content, &$selected > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        // borderTopRightRadius: theme.spacing(2),
        // borderBottomRightRadius: theme.spacing(2),
        // paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:''
        // padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        fontSize: '16px',
    },
    labelTextLittle:{
        fontSize: '14px',
        color: '#07a00c',
        paddingLeft:'7px'
    },
    labelInfo:{
        paddingLeft: '20px'
    }
}));
function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;
const labelTextArray=labelText.split('/')
    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {/*<LabelIcon color="inherit" className={classes.labelIcon} />*/}
                    {labelTextArray[0] &&
                        <Typography variant="body2" className={classes.labelText}>
                            {labelTextArray[0].trim()}
                        </Typography>
                    }
                    {labelTextArray[1] &&
                    <Typography variant="body2" className={classes.labelTextLittle}>
                        {labelTextArray[1].trim()}
                    </Typography>
                    }

                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                // group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

const TreeViewSidebar = ({filter,setOU}) => {
    const classes = useStyles();
    const renderTree = (nodes) => (
        <StyledTreeItem
            key={nodes.id}
            nodeId={nodes.id}
            labelText={nodes.name}
            labelIcon={Label}
            labelInfo=""
            color="#3c8039"
            bgColor="#e6f4ea"
        >
            {/*<TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>*/}
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </StyledTreeItem>
    );
    const [expanded, setExpanded] = React.useState(['root']);
    const [selected, setSelected] = React.useState('1');

    const handleToggle = (event, nodeIds) => {
            setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        // console.log('-nodeIds-',nodeIds)
        setSelected(nodeIds);
        setOU(allNodes[nodeIds].ou)
    };
    const allNodes=useMemo(()=>{
        var map={}
        const setItem=(item=>{
            map={...map, [item.id]:{id:item.id, ou:item.ou ? item.ou : '-z-' , name: item.name}}
            if (Array.isArray(item.children))  item.children.map((node) => setItem(node))
        })
        setItem(data)
        return map
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data])
    useEffect(()=>{
            setOU(allNodes[selected].ou)
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [allNodes])
    return (
        <div className={classes.root}>
            {/*<Box className={classes.label}>*/}
            {/*    {selected && !!filter ? allNodes[selected].name : '-'}*/}
            {/*</Box>*/}
            <TreeView
                className={classes.tree}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
                defaultSelected={'1'}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {renderTree(data)}
            </TreeView>
        </div>
    )
}
export default TreeViewSidebar
