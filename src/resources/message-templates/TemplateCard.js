import React, {useCallback, useMemo} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {CardContent,
    Grid,
    CardActions,
    Avatar,
    Typography,
    Box,
    Chip
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import SendIcon from '@material-ui/icons/Send';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {TemplateButton} from '../../components/buttons'
import {useData} from "../../context/Data"

const useStyles = makeStyles((theme) => ({
    root: {
        width: 370,
        minHeight: 230,
        margin:'10px',
        display: 'flex',
        flexDirection:'column'
    },

    avatar: {
        backgroundColor: green[500],
        width:'33px',
        height:'33px',
    },
    header:{
        paddingTop:0,
        paddingLeft:10,
        paddingBottom:10,
        marginBottom:8,
        backgroundColor:"#c9d2db",
        '& .MuiCardHeader-content':{
            '& span': {
                marginTop: 10,
                fontSize: '1.1rem',
                color: theme.palette.primary.main,
            }
        }
    },
    content:{
        paddingTop:0,
    },
    actions: {
        alignSelf:'flex-end',
        alignItems: 'flex-end',
        flexGrow:1,
        width:'100%'
    },
    templateButton:{
        '& .MuiSvgIcon-root':{
            fontSize:'32px',
        }
    },
    headerButton:{
            fontSize:'1.3rem',
    },
    category:{
        backgroundColor:"#eae8e8",
        color:"#808082",
        borderRadius:8
    },
    hidden:{
        visibility:'hidden'
    }
}));

export default function TemplateCard(props) {
    const {
        actions:{templateDialogOpen, newMessageDialogOpen, updateTemplateCategorySelectorValue},
        mutations: { messageTemplates:{delete:deleteTemplate},requestMessages:{create:sendMessage}},
    }= useData()

    const classes = useStyles();
    const {template}=props

    const isCategoryEmpty=useMemo(()=>!(!!template.category && template.category.length>0),[template.category])
    return (
        <Card className={classes.root} >
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <AddToPhotosOutlinedIcon className={classes.headerButton}/>
                    </Avatar>
                }
                title={template.name}
//                subheader="September 14, 2016"
            />

            <CardContent className={classes.content}>
                <Box>
                    <Grid container justify="flex-end">
                         <Chip
                            label={template.category}
                            variant={isCategoryEmpty ? "outlined": "default"}
                            className={`${classes.category} ${isCategoryEmpty ? classes.hidden : ''}`}
                        />
                    </Grid>
                    <Box mt={3}>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {template.text}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions className={classes.actions} >
                <Grid container >
                    <Grid item xs={6}>
                        <TemplateButton label={"Редактировать"}
                                        icon={<EditIcon />}
                                        className={classes.templateButton}
                                        onClick={()=>templateDialogOpen(template)}/>
                        <TemplateButton label={"Удалить"}
                                        icon={<DeleteForeverIcon />}
                                        className={classes.templateButton}
                                        onClick={()=>deleteTemplate.mutate(template.id)}/>
                    </Grid>
                    <Grid item xs={6} >
                        <Grid container justify="flex-end">
                            <TemplateButton label={"Отправить c исправлениями"}
                                            icon={<OpenInBrowserIcon />}
                                            className={classes.templateButton}
                                            onClick={()=>newMessageDialogOpen(template.text)}
                            />
                            <TemplateButton label={"Отправить"}
                                            icon={<SendIcon />}
                                            className={classes.templateButton}
                                            onClick={()=>sendMessage({ text: template.text, await:true})}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardActions>

        </Card>
    );
}
