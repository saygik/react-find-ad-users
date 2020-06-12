import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {grey} from "@material-ui/core/colors"
import Card from "@material-ui/core/Card"
import Box from "@material-ui/core/Box"
import CardHeader from "@material-ui/core/CardHeader"
import TextHighlighter from "../TextHighlighter"
import CardContent from "@material-ui/core/CardContent"
import AppsIcon from '@material-ui/icons/Apps';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import UsersList from './UsersList'

// {title: "ЕК ИСУФР ТОРО", zakazchik: "Служба Т", osn: "Приказ №179НЗ от 19.02.2013", users: Array(2)}
//  users :{name: "Крапивин Игорь Викторович", mail: "say@brnv.rw"}


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '700px',
        marginTop:20,
        padding:5
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
        fontSize:'0.9rem',
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
    tags:{
        color:'#8ea78e',
        fontSize:'.7rem',
        fontWeight: 400,
        textAlign:'left',
    },
}));

function SoftCard(props) {
    const classes = useStyles();
    const {software,index, searchValues,findAndSelectUser}=props

    // const handleSelectSoft = event => {
    //     event.preventDefault();
    //
    // }
    const handleSelectUser=(user)  => {
        findAndSelectUser(user)
    }
    const handleSelectDoc=(doc)  => {
        const win = window.open(doc.link, '_blank');
        if (win != null) { win.focus(); }
    }

    return (
        <Card className={classes.root}>
            <Box component={'div'} className={classes.number}>
                {index+1}
            </Box>
            <CardHeader

                style={{paddingTop: '0px', paddingBottom: '3px',marginTop: '-10px'}}
                avatar={<AppsIcon/>}
                // action={
                //     <IconButton aria-label="settings" onClick={handleSelectSoft}>
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={
                    <Box letterSpacing={3} className={classes.title}>
                        {/*<Link href="#" onClick={handleSelectSoft} color="inherit">*/}
                            <TextHighlighter searchValue={searchValues} text={software.title}  />
                        {/*</Link>*/}
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
                        <Box letterSpacing={1} className={classes.property}>
                            <Box component="span" letterSpacing={3} className={classes.propCaption}>
                                разработчик:&nbsp;
                            </Box>
                            {software.contacts ? <TextHighlighter searchValue={searchValues} text={software.contacts}    />: 'не определено'}
                        </Box>

                    </>
                }
            />
            <CardContent style={{padding:'0px', paddingLeft:'40px',paddingTop:'20px'}}>
                <UsersList caption={'Сопровождается в ИВЦ НОД-2'}
                           list={software.users}
                           handleSelect={handleSelectUser}
                           icon={<ContactPhoneIcon style={{ fontSize: 24, color:'#009000' }}/>}
                />
                <UsersList caption={'Сопровождается в Волковысском секторе ИВЦ'}
                           list={software.usersvolk}
                           handleSelect={handleSelectUser}
                           icon={<ContactPhoneIcon style={{ fontSize: 24, color:'#009000' }}/>}
                />
                <UsersList caption={'Сопровождается в Гродненском секторе ИВЦ'}
                           list={software.usersgrod}
                           handleSelect={handleSelectUser}
                           icon={<ContactPhoneIcon style={{ fontSize: 24, color:'#009000' }}/>}
                />
                <UsersList caption={'Сопровождается в Лидском секторе ИВЦ'}
                           list={software.userslid}
                           handleSelect={handleSelectUser}
                           icon={<ContactPhoneIcon style={{ fontSize: 24, color:'#009000' }}/>}
                />
                <UsersList caption={'Сопровождается в Лунинецком секторе ИВЦ'}
                           list={software.userslun}
                           handleSelect={handleSelectUser}
                           icon={<ContactPhoneIcon style={{ fontSize: 24, color:'#009000' }}/>}
                />
                <UsersList caption={'Техническая документация:'}
                           list={software.docs}
                           handleSelect={handleSelectDoc}
                           icon={<LocalLibraryIcon style={{ fontSize: 24, color:'#2a2c90' }}/>}
                />
                {
                    software.tags &&
                    <Box letterSpacing={3} className={classes.tags}>
                        тэги: <TextHighlighter searchValue={searchValues} text={software.tags}  />
                    </Box>
                }
            </CardContent>

        </Card>
    );
}
export default SoftCard
