import React from 'react';
import { SnackbarProvider } from 'notistack';
import {BrowserRouter} from "react-router-dom"

import { AuthProvider } from './context/Auth'
import { DataProvider } from './context/Data'
import Router from './router'
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//import {Footer} from './components/layout'
import SignInDialog from './components/dialogs/SignInDialog'
import 'typeface-roboto';
import './App.css';
import { resources } from "./resources"
import { Layout } from "./components/layout"
import { makeStyles } from '@material-ui/core/styles';



const theme = createMuiTheme({
    palette: {
        background: {
            default: "#f5f5f5"
        }
    }
});
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },

}));
function App() {
    const classes = useStyles();
  return (
    <div className="App">
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'center', }}>
                <AuthProvider>
                    <DataProvider>
                        <div className={classes.root}>
                            <CssBaseline />
                            <Layout resources={resources}>
                                <Router />
                            </Layout>
                            {/*<Footer/>*/}
                            <SignInDialog/>
                        </div>
                    </DataProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
