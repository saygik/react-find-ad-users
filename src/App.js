import React from 'react';
import SearchBar from './SearchBar';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import './App.css';

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#f5f5f5"
        }
    }
});

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SearchBar/>
        </ThemeProvider>
    </div>
  );
}

export default App;
