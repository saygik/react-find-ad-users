import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/Auth'
import { DataProvider } from './context/Data'
import Router from './router'
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Footer from './components/Footer/Footer'
import SignInDialog from './components/dialogs/SignInDialog'
import 'typeface-roboto';
import './App.css';
import Bar from "./Bar"
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
        minHeight: '100vh',
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
        <ThemeProvider theme={theme}>
            <SnackbarProvider anchorOrigin={{vertical: 'bottom', horizontal: 'center', }}>
                <AuthProvider>
                    <DataProvider>
                        <div className={classes.root}>
                            <CssBaseline />
                            <Bar/>
                            <Router/>
                            <Footer/>
                            <SignInDialog/>
                        </div>
                    </DataProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
