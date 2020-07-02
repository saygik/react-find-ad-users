import React from "react"
//import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box"
import {createMuiTheme, makeStyles, MuiThemeProvider, withStyles} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import Typography from "@material-ui/core/Typography"
import gray from "@material-ui/core/colors/grey"
import {useData} from "../../context/Data"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"

const LittleLoader = withStyles({
    root: {
        color: '#fff',
    },
})(CircularProgress);

const footertheme = createMuiTheme({
    palette: {
        primary: {
            main: gray[200],
            contrastText: gray[600]
        },
        secondary : {
            main: gray[400],
        },
    }
});
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#8c8c8c',
        marginTop: 'auto',
        padding: theme.spacing(2, 0),
    },
    copyrightext: {
        padding: theme.spacing(1,0),
        textAlign: 'center',
        color: theme.palette.secondary.contrastText,
    },
    bottomBorder:{
        marginTop:  '5px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: gray[400],
    },
    footer: {
        backgroundColor: '#8c8c8c',
        marginTop: 'auto',
        padding: theme.spacing(2, 0),
    },
    title:{
        fontSize:'1.6rem',
        [theme.breakpoints.down('xs')]: {
            fontSize:'1.3rem',
        },
    },
    loading:{
        width: '260px',
        fontSize:'1.1rem',
        [theme.breakpoints.down('xs')]: {
            fontSize:'1rem',
        },
    },
}));

const Footer= (props) => {
    const classes = useStyles()
    const { selectors } = useData()
    const { loadingProgress,adUsers,software }=selectors
    return (
        <Box className={classes.root}>
            <MuiThemeProvider theme={footertheme}>
                <Container color="secondary"  >
                    <Grid container  justify="flex-end">
                        <Grid container spacing={2}  className={classes.bottomBorder}>
                            <Grid item>
                                <Typography  variant="h2"  color="primary" >
                                    <Box width={1}  fontFamily="Monospace" className={classes.title} letterSpacing={3} mr={2}>
                                        СПРАВОЧНАЯ ИНФОРМАЦИЯ НОД-2
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item sm container  direction="column" justify="flex-start" alignItems="flex-start" >
                                <Box  className={classes.loading}>
                                <Grid item xs={12} sm container  direction="row" justify="flex-start" alignItems="flex-start" >
                                    <Grid item style={{width: '30px', }}>
                                        {loadingProgress.peoples.loading && <LittleLoader size={13}  style={{top: '37px', }}/>}
                                    </Grid>
                                    <Grid item >
                                        <Typography  variant="h2"  color="primary" >
                                            <Box  fontSize={'1.2rem'}   letterSpacing={1}>
                                                {
                                                    loadingProgress.peoples.loading
                                                        ? `загружено ${loadingProgress.peoples.progress}%`
                                                        : `всего ${adUsers.length} человек`
                                                }
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm container  direction="row" justify="flex-start" alignItems="flex-start" >
                                    <Grid item style={{width: '30px', }}>
                                        {loadingProgress.soft.loading && <LittleLoader size={13}  style={{top: '56px', }}/>}
                                    </Grid>
                                    <Grid item >
                                        <Typography  variant="h2"  color="primary" >
                                            <Box  fontSize={'1.2rem'}   letterSpacing={1}>
                                                {
                                                    loadingProgress.soft.loading
                                                        ? `загружено ${loadingProgress.soft.progress}%`
                                                        : `всего ${software.length} сервисов`
                                                }
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                </Box>
                            </Grid>

                         </Grid>
                        <Grid container spacing={3} direction="column" justify="flex-end" alignItems="center" >
                            <Box mt={2} className={classes.copyrightext}>
                                <Typography  variant="h2"  color="secondary" >
                                    <Box m={1}  fontSize={'.9rem'} letterSpacing={1}  >
                                        © 2020 ИВЦ, Барановичское отделение.
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </MuiThemeProvider>
        </Box>
    );

}
export default Footer
