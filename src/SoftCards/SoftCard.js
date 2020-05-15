import React, {useMemo} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {grey} from "@material-ui/core/colors"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import CardHeader from "@material-ui/core/CardHeader"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import TextHighlighter from "../TextHighlighter"
import CardContent from "@material-ui/core/CardContent"
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppsIcon from '@material-ui/icons/Apps';
import Grid from "@material-ui/core/Grid"
import GridLine from "../UserPropertyLine/UserPropertyLine"
import {presenceTimeFormat} from "../serices"
import {withMobileDialog} from "@material-ui/core"

// {title: "ЕК ИСУФР ТОРО", zakazchik: "Служба Т", osn: "Приказ №179НЗ от 19.02.2013", users: Array(2)}
//  users :{name: "Крапивин Игорь Викторович", mail: "say@brnv.rw"}


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '700px',
        marginTop:20,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    title:{
        color:'#81817f',
        fontSize:'1.4rem',
        fontWeight: 500,
        textAlign:'left',
    },
    property:{
        color:'#5d5d5b',
        fontSize:'0.9rem',
        fontWeight: 400,
        textAlign:'left',
    },
    propCaption:{
        color:'#4f774f',
        fontSize:'1rem',
        fontWeight: 600,
        textAlign:'left',
    },
    listCaption:{
        color:'#4f774f',
        fontSize:'1.1rem',
        fontWeight: 600,
        textAlign:'left',

    },
    number:{
        paddingTop:'5px',
        paddingLeft:'10px',
        color:grey[400],
    },
    url:{
        color:'#8ea78e',
        fontSize:'1.1rem',
        fontWeight: 400,
        textAlign:'left',
    },
}));

function SoftCard(props) {
    const classes = useStyles();
    const {software,index, searchValues,findAndSelectUser}=props

    const handleSelectSoft = event => {
        event.preventDefault();

    }
    const handleSelectUser=(user)  => {
        findAndSelectUser(user)
    }
    return (
        <Card className={classes.root}>
            <Box component={'div'} className={classes.number}>
                {index+1}
            </Box>
            <CardHeader

                style={{paddingTop: '0px', paddingBottom: '3px',marginTop: '-10px'}}
                avatar={<AppsIcon/>}
                action={
                    <IconButton aria-label="settings" onClick={handleSelectSoft}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Box letterSpacing={3} className={classes.title}>
                        <Link href="#" onClick={handleSelectSoft} color="inherit">
                            <TextHighlighter searchValue={searchValues} text={software.title}  />
                        </Link>
                    </Box>
                }
                subheader={
                    <>
                        <Box letterSpacing={1} className={classes.property}>
                             <Box component="span" letterSpacing={3} className={classes.propCaption}>
                                        заказчик:&nbsp;
                                    </Box>
                            {software.osn ?<TextHighlighter searchValue={searchValues} text={software.zakazchik}    />: 'не определено'}
                        </Box>
                        <Box letterSpacing={1} className={classes.property}>
                                    <Box component="span" letterSpacing={3} className={classes.propCaption}>
                                        расположение:&nbsp;
                                    </Box>
                                    {software.place ?<TextHighlighter searchValue={searchValues} text={software.place}    />: 'не определено'}
                        </Box>
                        <Box letterSpacing={1} className={classes.property}>
                                    <Box component="span" letterSpacing={3} className={classes.propCaption}>
                                        основание:&nbsp;
                                    </Box>
                            {software.osn ? <TextHighlighter searchValue={searchValues} text={software.osn}    />: 'не определено'}
                        </Box>

                    </>
                }
            />

            <CardContent style={{padding:'0px', paddingLeft:'40px',paddingTop:'20px'}}>
                {software.users &&
                <>
                    <Box component="span" letterSpacing={3} className={classes.listCaption} style={{marginTop:'30px', marginLeft:'16px'}}>
                        Сопровождается в ИВЦ НОД-2:&nbsp;
                    </Box>
                    <Grid container  justify='flex-start' style={{marginTop:'5px', marginBottom:'20px', marginLeft:'16px'}}>

                        <Box letterSpacing={3} className={classes.url}>
                            {software.users.map((user,index)=>{
                                return <Grid item key={index}>
                                    <Link href="#" onClick={()=>handleSelectUser(user)}>
                                        <TextHighlighter searchValue={searchValues} text={user.name} />
                                    </Link>
                                </Grid>
                            })}
                        </Box>
                    </Grid>
                </>
                }
                {software.docs &&
                <>
                    <Box component="span" letterSpacing={3} className={classes.listCaption} style={{marginTop:'30px', marginLeft:'16px'}}>
                        Техническая документация:&nbsp;
                    </Box>
                    <Grid container  justify='flex-start' style={{marginTop:'5px', marginBottom:'20px', marginLeft:'16px'}}>

                        <Box letterSpacing={3} className={classes.url}>
                            {software.docs.map((doc,index)=>{
                                return <Grid item key={index}>
                                    <Link href={doc.link} target="_blank">
                                        {doc.name}
                                    </Link>
                                </Grid>
                            })}
                        </Box>
                    </Grid>
                </>
                }
            </CardContent>

        </Card>
    );
}
export default SoftCard
