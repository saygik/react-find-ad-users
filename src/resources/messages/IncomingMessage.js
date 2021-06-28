import {makeStyles} from "@material-ui/core/styles"
import { Card, CardHeader, Typography, Box} from "@material-ui/core"
import {DeleteButton, StarButton} from "../../components/buttons"
import React, {useCallback} from "react"
import {useData} from "../../context/Data"
import {Checkbox} from "../../components/@inputs"
import ResponseBodyText from "./ResponseBodyText"
import {formatDateFromUnix} from "../../services"

const useStyles = makeStyles({
    card: {
        margin: '1px 1px 0px 1px',
        borderRadius: '0',
        "&:hover": {
            backgroundColor: "#f7f5f5",
            cursor: 'pointer'
        },
    },
    cardHeader: {
        alignItems: 'flex-start',
        paddingLeft: 0
    },

    rootButton: {
        fontSize: '32px',
    },
    button: {
        marginTop: '10px'
    },
});

const IncomingMessage = ({ record, handleDelete, handleStarred, isDeletedMessages=false }) => {
    const classes = useStyles();
    const {actions:{messageDialogOpen, selectResponseMessage}}= useData()

    return record ? (
        <Card className={classes.card} onClick={()=>messageDialogOpen(record)}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    isDeletedMessages
                        ? <Box ml={8}></Box>
                        : <Checkbox
                            checked={record.selected}
                            onChange={(event)=>selectResponseMessage(record.id, event.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                }
                action={ <>
                    <StarButton onClick={()=>handleStarred()} label={"Отметить"} size={"large"} color={record.starred && '#f5f509'}/>
                    <DeleteButton onClick={()=>handleDelete()} label={"Удалить"} size={"large"} color={record.deleted && '#d40d24'}/>

                </>}
                subheader={ <>
                    <ResponseBodyText
                        header={record?.requests?.id && <Typography variant="caption">{record.requests.text}</Typography>}
                        text={record.text.split("\n").map(function(item, idx) {
                            return (
                                <span key={idx}>
                                        {item}
                                    <br/>
                                    </span>
                            )
                        })}
                        footer={`создано: ${formatDateFromUnix(record.created_at)}` }/>
                </> }
            />
        </Card>
    ) : null;
};

export default IncomingMessage;
