import {makeStyles} from "@material-ui/core/styles"
import {Avatar, Card, CardHeader, Typography, Chip, Box} from "@material-ui/core"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {AddTemplateButton} from "../../components/buttons"
import React, {useCallback} from "react"
import {useData} from "../../context/Data"
import RequestBodyText from './RequestBodyText'


const useEventStyles = makeStyles({
    card: {
        margin: '1px 1px 0px 1px',
        borderRadius:'0',
        "&:hover": {
            backgroundColor: "#e9dbdb",
            cursor: 'pointer'
        },
        "& .MuiCardHeader-root": {
            padding: '8px 1em 8px 1em'
        }
    },
    cardHeader: {
        alignItems: 'flex-start',
    },
    clamp: {
        fontSize:'1.25rem',
        color:'#17b506',
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
    okButton: {
            fontSize:'40px',
    },

});


const OutcomingMessage = ({ record }) => {
    const classes = useEventStyles();
    const {
        actions:{messageDialogOpen, templateDialogOpen},
    }= useData()

    const handleClick = useCallback(
        event => {
            event.preventDefault();
            event.stopPropagation();
            record.messages && messageDialogOpen({...record.messages, requests:{id:record.id, text: record.text}});

        },[record] );   // console.log('-record-',record)
    console.log('--555555555555-',record)
    return record ? (
        <Card className={classes.card}   onClick={handleClick}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar
                        aria-label={'deleted.message'}
                        className={classes.avatar}
                    >
                        {
                            !record.messages.id
                                ? <HourglassEmptyRoundedIcon />
                                : record.messages.deleted ? <DeleteForeverIcon className={classes.okButton} /> : <CheckCircleIcon className={classes.okButton} />
                        }
                    </Avatar>
                }
                action={ <>
                    <AddTemplateButton
                        label={"Добавить в шаблоны"}
                        onClick={()=>templateDialogOpen({text: record.text})}
                        size={"large"}
                    />
                </>}
                title={
                    <Typography variant="body2" className={classes.clamp}>
                        {record.text}
                    </Typography>
                }
                subheader={ <>
                    <RequestBodyText ip={record.ip} created_at={record.created_at} />
                </> }
            />
        </Card>
    ) : null;
}

export default OutcomingMessage;
