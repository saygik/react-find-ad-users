import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {SnackbarProvider} from "notistack"
import Slide from "@material-ui/core/Slide"
import {QueryClient, QueryClientProvider} from "react-query"
import {AuthProvider} from "./context/Auth"
import {DataProvider} from "./context/Data"

const queryClient = new QueryClient()
const CombinedProviders = React.memo((props) => {

    return (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <SnackbarProvider maxSnack={3}
                              hideIconVariant={false}
                              anchorOrigin={{vertical: 'bottom', horizontal: 'left', }}
                              TransitionComponent={Slide}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <DataProvider>
                        {props.children}
                        </DataProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </SnackbarProvider>
        </BrowserRouter>
    )
})

export default CombinedProviders
