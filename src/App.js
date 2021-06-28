import React from 'react';
import Router from './router'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import {SignInDialog} from './components/dialogs'
import { resources } from "./resources"
import { Layout } from "./components/layout"
import CombinedProviders from './combinedProviders'

import 'typeface-roboto';
import './App.css';

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
        <CombinedProviders>
            <div className={classes.root}>
                <CssBaseline />
                <Layout resources={resources}>
                    <Router />
                </Layout>
                <SignInDialog/>
            </div>
        </CombinedProviders>
    </div>
  );
}

export default App;
